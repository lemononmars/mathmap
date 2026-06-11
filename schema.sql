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

-- Secure function to handle lesson completion
create function public.complete_lesson(p_lesson_id text, p_course_id text)
returns void as $$
declare
  v_user_id uuid;
  v_badges jsonb;
  v_completed_lessons jsonb;
begin
  v_user_id := auth.uid();
  if v_user_id is null then
    return;
  end if;

  -- Get current progress
  select badges, completed_lessons into v_badges, v_completed_lessons
  from public.profiles
  where user_id = v_user_id;

  -- Only proceed if lesson not already completed
  if not (v_completed_lessons ? p_lesson_id) then

    -- Append lesson
    v_completed_lessons := v_completed_lessons || jsonb_build_array(p_lesson_id);

    -- Check and award course specific badges
    if p_course_id = 'calculus-1' and not (v_badges ? 'calc-novice') then
      v_badges := v_badges || jsonb_build_array('calc-novice');
    end if;

    if p_course_id = 'precalculus' and not (v_badges ? 'precalc-pro') then
      v_badges := v_badges || jsonb_build_array('precalc-pro');
    end if;

    -- Update profile
    update public.profiles
    set
      completed_lessons = v_completed_lessons,
      badges = v_badges,
      points = points + 10,
      updated_at = now()
    where user_id = v_user_id;

  end if;

end;
$$ language plpgsql security definer;
