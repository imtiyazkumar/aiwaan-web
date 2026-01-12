-- Function to update 'updated_at' column
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 1. ADD updated_at to PROJECTS
alter table public.projects add column if not exists updated_at timestamp with time zone default timezone('utc'::text, now());
-- Trigger for Projects
drop trigger if exists on_projects_updated on public.projects;
create trigger on_projects_updated
  before update on public.projects
  for each row execute procedure public.handle_updated_at();

-- 2. ADD updated_at to SERVICES
alter table public.services add column if not exists updated_at timestamp with time zone default timezone('utc'::text, now());
-- Trigger for Services
drop trigger if exists on_services_updated on public.services;
create trigger on_services_updated
  before update on public.services
  for each row execute procedure public.handle_updated_at();

-- 3. ADD updated_at to BILLS
alter table public.bills add column if not exists updated_at timestamp with time zone default timezone('utc'::text, now());
-- Trigger for Bills
drop trigger if exists on_bills_updated on public.bills;
create trigger on_bills_updated
  before update on public.bills
  for each row execute procedure public.handle_updated_at();

-- 4. Trigger for PROFILES (Already has updated_at)
drop trigger if exists on_profiles_updated on public.profiles;
create trigger on_profiles_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();
