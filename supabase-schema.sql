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
