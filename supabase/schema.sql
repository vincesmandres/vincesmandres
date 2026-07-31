create table if not exists public.spaces (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  description text not null default '',
  color text not null default '#ee7651',
  icon text not null default '✦',
  resources integer not null default 0,
  progress integer not null default 0 check (progress between 0 and 100),
  created_at timestamptz not null default now()
);

alter table public.spaces enable row level security;

create policy "Users can read their own spaces"
  on public.spaces for select using (auth.uid() = owner_id);
create policy "Users can create their own spaces"
  on public.spaces for insert with check (auth.uid() = owner_id);
create policy "Users can update their own spaces"
  on public.spaces for update using (auth.uid() = owner_id);
create policy "Users can delete their own spaces"
  on public.spaces for delete using (auth.uid() = owner_id);

create or replace function public.seed_default_spaces()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.spaces (owner_id, name, description, color, icon, resources, progress) values
    (new.id, 'Matemática · Álgebra', 'Ecuaciones, matrices y pensamiento algebraico.', '#ee7651', '∑', 3, 32),
    (new.id, 'Geometría', 'Formas, espacio y demostraciones visuales.', '#b3a6ff', '△', 0, 0),
    (new.id, 'Física', 'Experimenta con las reglas que mueven el mundo.', '#75d4b5', '↗', 0, 0);
  return new;
end; $$;

drop trigger if exists on_auth_user_created_seed_spaces on auth.users;
create trigger on_auth_user_created_seed_spaces
  after insert on auth.users
  for each row execute procedure public.seed_default_spaces();
