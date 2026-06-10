-- Create a table for public profiles
create table profiles (
  user_id uuid references auth.users not null primary key,
  points integer default 0,
  badges jsonb default '[]'::jsonb,
  completed_lessons jsonb default '[]'::jsonb,
  updated_at timestamp with time zone
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = user_id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = user_id);

-- Function to handle new user signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id, points, badges, completed_lessons)
  values (new.id, 0, '[]'::jsonb, '[]'::jsonb);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call the function on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
