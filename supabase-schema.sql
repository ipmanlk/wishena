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
