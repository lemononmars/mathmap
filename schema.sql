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

-- Function to update progress securely
create function public.update_progress(p_lesson_id text, p_badge_id text default null)
returns void as $$
declare
  v_user_id uuid := auth.uid();
  v_has_lesson boolean;
  v_has_badge boolean;
begin
  if v_user_id is null then
    return;
  end if;

  -- Check if lesson already completed
  select completed_lessons ? p_lesson_id into v_has_lesson
  from public.profiles
  where user_id = v_user_id;

  if not v_has_lesson then
    update public.profiles
    set
      completed_lessons = completed_lessons || jsonb_build_array(p_lesson_id),
      points = points + 10,
      updated_at = now()
    where user_id = v_user_id;
  end if;

  -- Add badge if provided and not already earned
  if p_badge_id is not null then
    select badges ? p_badge_id into v_has_badge
    from public.profiles
    where user_id = v_user_id;

    if not v_has_badge then
      update public.profiles
      set
        badges = badges || jsonb_build_array(p_badge_id),
        updated_at = now()
      where user_id = v_user_id;
    end if;
  end if;
end;
$$ language plpgsql security definer;

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
