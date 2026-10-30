-- ========================================================
-- SafaiSaathi (सफ़ाई साथी) - Supabase Database Schema
-- Street Cleaning Gamification & AI Verification
-- ========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. USERS TABLE
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  total_points integer default 0 check (total_points >= 0),
  avatar_url text,
  city text default 'New Delhi',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. MISSIONS TABLE
create table if not exists public.missions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade not null,
  category text not null check (category in ('Plastic', 'Organic', 'Mixed', 'Construction', 'E-Waste', 'Hazardous')),
  before_image_url text not null,
  after_image_url text not null,
  video_url text,
  latitude numeric(10, 7) not null,
  longitude numeric(10, 7) not null,
  status text not null check (status in ('approved', 'rejected')),
  points_awarded integer default 0 check (points_awarded >= 0),
  ai_feedback text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create indexes for performance
create index if not exists idx_missions_user_id on public.missions(user_id);
create index if not exists idx_missions_created_at on public.missions(created_at desc);
create index if not exists idx_users_total_points on public.users(total_points desc);

-- 3. AUTOMATIC POINT ACCUMULATION TRIGGER
-- Whenever a mission is approved, automatically increment the user's total_points
create or replace function public.handle_mission_points()
returns trigger as $$
begin
  if NEW.status = 'approved' and NEW.points_awarded > 0 then
    update public.users
    set total_points = total_points + NEW.points_awarded
    where id = NEW.user_id;
  end if;
  return NEW;
end;
$$ language plpgsql security definer;

drop trigger if exists on_mission_created on public.missions;
create trigger on_mission_created
  after insert on public.missions
  for each row
  execute function public.handle_mission_points();

-- 4. ROW LEVEL SECURITY (RLS)
alter table public.users enable row level security;
alter table public.missions enable row level security;

-- Allow public read of leaderboard and users
create policy "Allow public read access to users"
  on public.users for select
  using (true);

create policy "Allow insert on users"
  on public.users for insert
  with check (true);

create policy "Allow update on own user"
  on public.users for update
  using (true);

-- Allow public read of missions
create policy "Allow public read access to missions"
  on public.missions for select
  using (true);

create policy "Allow insert to missions"
  on public.missions for insert
  with check (true);

-- 5. STORAGE BUCKET CONFIGURATION (Supabase Storage)
-- Run this in Supabase SQL editor to create the storage bucket for mission media:
insert into storage.buckets (id, name, public)
values ('missions', 'missions', true)
on conflict (id) do nothing;

-- Allow public access to view mission files
create policy "Public Access to Mission Media"
  on storage.objects for select
  using (bucket_id = 'missions');

-- Allow authenticated and anon uploads
create policy "Allow Public Uploads to Mission Media"
  on storage.objects for insert
  with check (bucket_id = 'missions');

-- 6. SAMPLE SEED DATA (For Immediate Verification)
insert into public.users (id, name, email, total_points, city)
values 
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Aarav Sharma', 'aarav@swachh.org', 145, 'New Delhi'),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Priya Patel', 'priya@swachh.org', 210, 'Indore'),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Vikram Singh', 'vikram@swachh.org', 95, 'Bengaluru')
on conflict (email) do nothing;

insert into public.missions (id, user_id, category, before_image_url, after_image_url, latitude, longitude, status, points_awarded, ai_feedback)
values
  (
    'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44',
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Plastic',
    '/demo-assets/pair1-before.jpg',
    '/demo-assets/pair1-after.jpg',
    28.6139391,
    77.2090212,
    'approved',
    42,
    'Verified Authentic Cleanup: Landmark and curb markings match perfectly. Substantial pile of single-use plastic bottles and wrappers cleared thoroughly into segregated waste bag.'
  )
on conflict (id) do nothing;
