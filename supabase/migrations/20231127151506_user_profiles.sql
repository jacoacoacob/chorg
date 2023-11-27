-- Create a table for public profiles
CREATE TABLE
    profiles (
        id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
        updated_at TIMESTAMP WITH TIME ZONE,
        username TEXT UNIQUE,
        full_name TEXT,
        avatar_url TEXT,
        website TEXT,
        CONSTRAINT username_length CHECK (CHAR_LENGTH(username) >= 3)
    );


-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;


CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR
SELECT
    USING (TRUE);


CREATE POLICY "Users can insert their own profile." ON profiles FOR INSERT
WITH
    CHECK (auth.uid () = id);


CREATE POLICY "Users can update own profile." ON profiles FOR
UPDATE USING (auth.uid () = id);


-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
CREATE FUNCTION public.handle_new_user () RETURNS TRIGGER AS $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_user ();


-- Set up Storage!
INSERT INTO
    STORAGE.buckets (id, NAME)
VALUES
    ('avatars', 'avatars');


-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
CREATE POLICY "Avatar images are publicly accessible." ON STORAGE.objects FOR
SELECT
    USING (bucket_id = 'avatars');


CREATE POLICY "Anyone can upload an avatar." ON STORAGE.objects FOR INSERT
WITH
    CHECK (bucket_id = 'avatars');