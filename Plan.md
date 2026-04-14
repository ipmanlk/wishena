# Guest Data & Custom Fields Revamp Plan

## Current Problems

1. **Personal note is mislabeled** - Fixed temporarily but needs proper separation of public vs private notes
2. **Guest name field confusion** - "Additional Information" section has a redundant "Guest Name(s)" field
3. **Static guest fields** - `tableNumber` is hardcoded in templates but not all events need it
4. **No privacy control** - Can't mark fields as private (internal only) vs public (shown on invite)
5. **Template fields are hardcoded** - Can't customize per-event what additional info to collect

## Proposed Solution

### 1. Database Schema Changes

#### Drop and recreate `invite_guests` table:

```sql
-- Drop existing table (data loss acceptable - dev environment)
drop table if exists public.invite_rsvps cascade;
drop table if exists public.invite_guests cascade;

-- New invite_guests table with proper field separation
create table public.invite_guests (
  id             text        primary key,
  project_id     text        not null references public.invite_projects(id) on delete cascade,
  
  -- Core guest info (always collected)
  display_name   text        not null,  -- What's shown on invite: "Priya & Vikram" or "John Smith"
  
  -- Public fields (shown on invite card)
  personal_note  text,                   -- Personal message shown to guest on their invite
  
  -- Private fields (internal use only, never exposed to public)
  internal_note  text,                   -- Internal reference for host
  email          text,                   -- For host contact
  contact_number text,                   -- For host contact
  
  -- Dynamic custom fields (JSONB for flexibility)
  -- Each field has: value (string), isPublic (boolean)
  custom_fields  jsonb       not null default '{}',
  
  created_at     timestamptz not null default now()
);

-- Example custom_fields structure:
-- {
--   "tableNumber": { "value": "Table 7", "isPublic": true },
--   "dietaryRestrictions": { "value": "Vegetarian, allergic to nuts", "isPublic": false },
--   "plusOneName": { "value": "Vikram Sharma", "isPublic": true }
-- }

alter table public.invite_guests enable row level security;

create policy "Invite guests are publicly readable"
  on public.invite_guests
  for select
  using (true);

create policy "Project owner can manage guests"
  on public.invite_guests
  for all
  using (
    exists (
      select 1 from public.invite_projects p
      where p.id = project_id and p.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.invite_projects p
      where p.id = project_id and p.user_id = auth.uid()
    )
  );

-- Recreate RSVP table (unchanged)
create table public.invite_rsvps (
  id           text        primary key,
  guest_id     text        not null references public.invite_guests(id) on delete cascade,
  project_id   text        not null references public.invite_projects(id) on delete cascade,
  response     text        not null check (response in ('yes', 'no')),
  responded_at timestamptz not null default now()
);

alter table public.invite_rsvps enable row level security;

create policy "Anyone can upsert their RSVP"
  on public.invite_rsvps
  for all
  using (true)
  with check (true);

create policy "Project owner can read RSVPs"
  on public.invite_rsvps
  for select
  using (
    exists (
      select 1 from public.invite_projects p
      where p.id = project_id and p.user_id = auth.uid()
    )
  );
```

### 2. TypeScript Types Update

```typescript
// Custom field definition for a project (set when creating event)
interface GuestFieldDefinition {
  key: string;           // e.g., "tableNumber", "dietaryRestrictions"
  label: string;         // e.g., "Table Number", "Dietary Requirements"
  type: "text" | "textarea";
  required: boolean;
  isPublic: boolean;     // If true, shown on invite. If false, internal only.
  placeholder?: string;
}

// Custom field value stored per guest
interface GuestCustomField {
  value: string;
  isPublic: boolean;     // Copied from definition at creation time
}

// Updated InviteProject - add custom field definitions
interface InviteProject {
  id: string;
  userId: string;
  templateId: string;
  inviteKind: string;
  title: string;
  payload: Record<string, string>;
  rsvpEnabled: boolean;
  guestLimit?: number;
  guestFieldDefinitions: GuestFieldDefinition[];  // NEW: Custom fields for this event
  createdAt: string;
  updatedAt: string;
}

// Updated InviteGuest
interface InviteGuest {
  id: string;
  projectId: string;
  displayName: string;           // Renamed from 'name'
  personalNote?: string;         // Public: shown on invite
  internalNote?: string;         // Private: host only
  email?: string;                // Private: host only
  contactNumber?: string;        // Private: host only
  customFields: Record<string, GuestCustomField>;  // NEW: Dynamic fields
  createdAt: string;
}

// Public-safe guest data (for invite rendering)
interface PublicGuest {
  id: string;
  projectId: string;
  displayName: string;
  personalNote?: string;
  customFields: Record<string, string>;  // Only public custom fields, values only
}
```

### 3. Project Creation Flow Changes

When creating an event, after selecting template:

1. **Show "Configure Guest Information" section**
   - Display template's suggested fields (e.g., Table Number for weddings)
   - Allow adding custom fields with:
     - Field name (e.g., "Dietary Restrictions")
     - Type (text/textarea)
     - Required (yes/no)
     - **Public/Private toggle** (crucial: determines if shown on invite)
   - Allow removing suggested fields
   - Allow reordering fields

2. **Store field definitions in `project.guestFieldDefinitions`**

### 4. Template Updates

Update all existing templates to specify their default guest fields:

```typescript
// Example: garden-romance template
export const gardenRomanceTemplate: InviteTemplate = {
  // ... existing fields ...
  defaultGuestFieldDefinitions: [
    {
      key: "tableNumber",
      label: "Table Number",
      type: "text",
      required: false,
      isPublic: true,  // Shown on invite
      placeholder: "Table 7"
    }
  ]
};
```

Remove hardcoded `guestInputs` from templates - they're now dynamic per-project.

### 5. Add/Edit Guest Form Changes

**Form sections (in order):**

1. **Guest Name(s)** 
   - Single field labeled "Guest Name(s)"
   - Placeholder: "e.g., Priya & Vikram or John Smith"
   - Help text: "How the guest's name appears on their invitation"

2. **Personal Note (Optional)**
   - Textarea
   - Help text: "A personal message shown on this guest's invitation card"
   - Example: "We can't wait to celebrate with you!"

3. **Contact Information (Private)**
   - Email field
   - Contact Number field
   - Help text: "For your reference only. Not shown on the invite."

4. **Internal Note (Private)**
   - Textarea
   - Help text: "Internal notes for your reference. Never shown to guests."
   - Example: "Dietary requirements, plus one details, etc."

5. **Additional Information**
   - Dynamic fields based on `project.guestFieldDefinitions`
   - Each field shows:
     - Label
     - Input (text/textarea)
     - Badge indicating "Shown on invite" or "Private"

### 6. Dashboard Guest List Changes

- **Display Name column**: Shows `displayName`
- **Details column**: Shows all custom fields with badges:
  - Public fields: shown with "👁 Public" badge
  - Private fields: shown with "🔒 Private" badge
- **Contact column**: Email/phone (if provided)
- **Internal Note**: Show truncated preview in tooltip or expandable row

### 7. Public Invite Rendering Changes

In `InviteCardRenderer`:

```typescript
const publicGuest: PublicGuest = {
  id: guest.id,
  projectId: guest.projectId,
  displayName: guest.displayName,
  personalNote: guest.personalNote,
  // Only include custom fields marked as public
  customFields: Object.entries(guest.customFields)
    .filter(([_, field]) => field.isPublic)
    .reduce((acc, [key, field]) => ({ ...acc, [key]: field.value }), {})
};
```

Module binding resolution:
- `bindTo: "displayName"` → `publicGuest.displayName`
- `bindTo: "personalNote"` → `publicGuest.personalNote`
- `bindTo: "tableNumber"` → `publicGuest.customFields.tableNumber` (if public)

### 8. Migration Strategy

Since backward compatibility is not required:

1. **Drop tables** (in order due to FK constraints):
   ```sql
   drop table if exists public.invite_rsvps cascade;
   drop table if exists public.invite_guests cascade;
   ```

2. **Recreate with new schema** (see section 1)

3. **Update TypeScript types** (`src/lib/types.ts`)

4. **Update all templates** - remove `guestInputs`, add `defaultGuestFieldDefinitions`

5. **Update forms** - AddGuestForm, EditGuestForm

6. **Update repositories** - Map new DB columns to TypeScript types

7. **Update dashboard** - Guest list columns

8. **Update invite renderer** - Sanitization logic

### 9. UI Mockup

**Add Guest Modal:**

```
┌─────────────────────────────────────────┐
│ Add Guest                               │
├─────────────────────────────────────────┤
│                                         │
│ Guest Name(s) *                         │
│ ┌─────────────────────────────────────┐ │
│ │ Priya & Vikram                      │ │
│ └─────────────────────────────────────┘ │
│ How the name appears on the invitation  │
│                                         │
│ Personal Note (shown on invite)         │
│ ┌─────────────────────────────────────┐ │
│ │ Can't wait to celebrate with you!   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ── Contact Information (private) ──     │
│ Email                                   │
│ ┌─────────────────────────────────────┐ │
│ │ priya@example.com                   │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Contact Number                          │
│ ┌─────────────────────────────────────┐ │
│ │ +1 234 567 8900                     │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ── Internal Note (private) ──           │
│ ┌─────────────────────────────────────┐ │
│ │ Vegetarian, allergic to nuts        │ │
│ └─────────────────────────────────────┘ │
│ Never shown to guests                   │
│                                         │
│ ── Additional Information ──            │
│ Table Number                    👁 Public│
│ ┌─────────────────────────────────────┐ │
│ │ Table 7                             │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Dietary Requirements           🔒 Private│
│ ┌─────────────────────────────────────┐ │
│ │ Vegetarian, no nuts                 │ │
│ └─────────────────────────────────────┘ │
│                                         │
│         [Cancel]  [Add Guest]           │
└─────────────────────────────────────────┘
```

### 10. Files to Modify

**Database:**
- `supabase-schema.sql` - Drop and recreate tables

**Types:**
- `src/lib/types.ts` - Update `InviteGuest`, `InviteProject`, add new interfaces

**Templates:**
- All files in `src/lib/invite-templates/` - Replace `guestInputs` with `defaultGuestFieldDefinitions`

**Components:**
- `src/components/invites/AddGuestForm.tsx` - Complete rewrite with new structure
- `src/components/invites/EditGuestForm.tsx` - Complete rewrite with new structure
- `src/components/invites/GuestListClient.tsx` - Update columns, show field privacy badges
- `src/components/invites/GuestRowActions.tsx` - No changes needed

**Repositories:**
- `src/lib/storage/supabase-invite-guest-repository.ts` - Update column mappings
- `src/lib/storage/supabase-invite-repository.ts` - Handle `guestFieldDefinitions` JSONB

**Public Invite:**
- `src/components/invite/InviteCardRenderer.tsx` - Update sanitization logic

**Project Creation:**
- `src/components/invites/ProjectDetailsForm.tsx` - Add guest field configuration UI
- `src/app/(app)/invites/new/[kind]/[templateId]/page.tsx` - Pass field definitions

### 11. Benefits

1. **Clear separation** - Public vs private data is explicit
2. **Flexible** - Each event can define its own guest fields
3. **Privacy-first** - Private fields never touch public components
4. **User-friendly** - Visual indicators show what's public/private
5. **No confusion** - Single "Guest Name(s)" field, no duplicates
6. **Template-agnostic** - Templates suggest fields but hosts customize

## Tables to Drop

Run this before applying new schema:

```sql
drop table if exists public.invite_rsvps cascade;
drop table if exists public.invite_guests cascade;
```

The `invite_projects` table can be kept but needs the `guestFieldDefinitions` column added (or store in `payload` JSONB initially).