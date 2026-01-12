-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES (Public profiles for users)
create table public.profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  is_admin boolean default false,

  constraint username_length check (char_length(username) >= 3)
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Handle New User Signup Trigger
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- PROJECTS
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  type text,
  location text,
  image_url text, -- Featured Image
  gallery text[] default array[]::text[], -- Multiple images
  status text default 'active',
  client text,
  year text,
  tags text[],
  is_featured boolean default false
);

alter table public.projects enable row level security;

create policy "Projects are viewable by everyone."
  on projects for select
  using ( true );

create policy "Admins can insert projects."
  on projects for insert
  with check ( exists ( select 1 from profiles where id = auth.uid() and is_admin = true ) );

create policy "Admins can update projects."
  on projects for update
  using ( exists ( select 1 from profiles where id = auth.uid() and is_admin = true ) );

create policy "Admins can delete projects."
  on projects for delete
  using ( exists ( select 1 from profiles where id = auth.uid() and is_admin = true ) );


-- SERVICES
create table public.services (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  image_url text,
  gallery text[] default array[]::text[],
  tag text,
  is_featured boolean default false,
  features text[],
  button_title text default 'Explore Service'
);

alter table public.services enable row level security;

create policy "Services are viewable by everyone."
  on services for select
  using ( true );

create policy "Admins can insert services."
  on services for insert
  with check ( exists ( select 1 from profiles where id = auth.uid() and is_admin = true ) );

create policy "Admins can update services."
  on services for update
  using ( exists ( select 1 from profiles where id = auth.uid() and is_admin = true ) );


-- BILLING / BILLS
create table public.bills (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users not null,
  amount numeric(10, 2) not null,
  status text default 'pending', -- pending, paid, overdue
  due_date timestamp with time zone,
  paid_at timestamp with time zone,
  reference_id text
);

alter table public.bills enable row level security;

create policy "Users can view their own bills."
  on bills for select
  using ( auth.uid() = user_id );

create policy "Admins can view all bills."
  on bills for select
  using ( exists ( select 1 from profiles where id = auth.uid() and is_admin = true ) );

create policy "Admins can insert bills."
  on bills for insert
  with check ( exists ( select 1 from profiles where id = auth.uid() and is_admin = true ) );

-- ORDERS (If needed, similar to bills but for project orders)
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users not null,
  service_id uuid references services(id),
  amount numeric(10, 2),
  status text default 'new',
  details jsonb
);

alter table public.orders enable row level security;

create policy "Users can view their own orders."
  on orders for select
  using ( auth.uid() = user_id );

create policy "Admins can view all orders."
  on orders for select
  using ( exists ( select 1 from profiles where id = auth.uid() and is_admin = true ) );

create policy "Admins can update orders."
  on orders for update
  using ( exists ( select 1 from profiles where id = auth.uid() and is_admin = true ) );

-- STORAGE BUCKETS (Note: Policies for storage must be created in the Storage section or via SQL if enabled)
-- insert into storage.buckets (id, name, public) values ('project-images', 'project-images', true);
-- insert into storage.objects ...
