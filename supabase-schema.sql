-- 1. Create guest sessions table
create table public.guest_sessions (
  id          uuid        primary key default gen_random_uuid(),
  wish_count  int         not null default 0,
  created_at  timestamptz not null default now(),
  last_seen   timestamptz not null default now()
);

-- 2. Create guest wishes table
create table public.guest_wishes (
  id              text        primary key,
  guest_session_id uuid       not null references public.guest_sessions(id) on delete cascade,
  template_id     text        not null,
  payload         jsonb       not null,
  created_at      timestamptz not null default now(),
  expires_at      timestamptz
);

-- 3. Create wishes table (for authenticated users)
create table public.wishes (
  id          text        primary key,
  user_id     uuid        not null references auth.users(id) on delete cascade,
  template_id text        not null,
  payload     jsonb       not null,
  created_at  timestamptz not null default now(),
  expires_at  timestamptz
);

-- 4. Enable RLS on wishes
alter table public.wishes enable row level security;

create policy "Users can manage their own wishes"
  on public.wishes
  for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Note: We don't enable RLS on guest_sessions or guest_wishes 
-- as they will only be accessed via the Service Role key on the server.

-- 5. Create a public users table for profile management
create table public.users (
  id          uuid        primary key references auth.users(id) on delete cascade,
  email       text,
  full_name   text,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz
);

alter table public.users enable row level security;

create policy "Users can view their own profile"
  on public.users
  for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.users
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 6. Trigger to automatically create a user profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture')
  );
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 7. Invite Projects (generic — works for wedding, party, concert, etc.)
create table public.invite_projects (
  id           text        primary key,
  user_id      uuid        not null references auth.users(id) on delete cascade,
  template_id  text        not null,
  invite_kind  text        not null,              -- "wedding", "party", "concert", etc.
  title        text        not null,
  payload      jsonb       not null default '{}', -- All project-level input fields
  rsvp_enabled boolean     not null default false,
  guest_limit  int,                               -- null = unlimited; future premium gating
  guest_field_definitions jsonb not null default '[]',
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table public.invite_projects enable row level security;

create policy "Users can manage their own invite projects"
  on public.invite_projects
  for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 8. Invite Guests — one row = one personalised card + unique URL
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

-- 9. RSVP responses — upsert pattern allows changing mind via same URL
create table public.invite_rsvps (
  id           text        primary key,
  guest_id     text        not null references public.invite_guests(id) on delete cascade,
  project_id   text        not null references public.invite_projects(id) on delete cascade,
  response     text        not null check (response in ('yes', 'no', 'unsure')),
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
