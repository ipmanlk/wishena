# Wishena

Wishena is a Next.js App Router product for creating wishes and managing invite projects.

## Routes

Public
- `/` landing
- `/guest/wishes/new` guest wish creation
- `/guest/wishes/new/[templateId]` guest wish creation with a template
- `/w/[id]` wish viewer
- `/i/[guestId]` invite guest view
- `/auth/login`, `/auth/signup`, `/auth/verify`, `/auth/callback`

Authenticated
- `/me/wishes` wish list
- `/me/wishes/new` create a wish
- `/me/wishes/new/[templateId]` create a wish from a template
- `/me/invites` invite projects
- `/me/invites/new` create invite
- `/me/invites/new/[kind]`
- `/me/invites/new/[kind]/[templateId]`
- `/me/invites/[projectId]`
- `/me/invites/[projectId]/edit`
- `/me/invites/[projectId]/guests/new`
- `/me/invites/[projectId]/guests/[guestId]/edit`

## Development

```bash
bun run dev
```

## Build & Lint

```bash
bun run build
bun run lint
```
