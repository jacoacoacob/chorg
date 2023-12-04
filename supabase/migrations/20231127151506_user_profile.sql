-- Create a table for public user_profile
CREATE TABLE IF NOT EXISTS
  user_profile (
    id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
    updated_at TIMESTAMP WITH TIME ZONE,
    username TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    website TEXT,
    CONSTRAINT username_length CHECK (CHAR_LENGTH(username) >= 3)
  );

ALTER TABLE public.user_profile OWNER TO postgres;

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
ALTER TABLE public.user_profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public user_profile are viewable by everyone." ON public.user_profile FOR
SELECT
  USING (TRUE);

-- CREATE POLICY "Users can insert their own profile." ON public.user_profile FOR INSERT
-- WITH
--   CHECK (auth.uid () = id);
-- CREATE POLICY "Users can update own profile." ON public.user_profile FOR
-- UPDATE USING (auth.uid () = id);
-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
CREATE FUNCTION public.handle_new_user () RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profile (id, avatar_url, username)
  VALUES (new.id, new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'username');

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users FOR EACH ROW
EXECUTE PROCEDURE public.handle_new_user ();

CREATE FUNCTION public.handle_updated_user () RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.user_profile
  SET
    avatar_url = NEW.raw_user_meta_data->>'avatar_url',
    username = NEW.raw_user_meta_data->>'username'
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_updated
AFTER
UPDATE ON auth.users FOR EACH ROW
EXECUTE PROCEDURE public.handle_updated_user ();

-- Set up storage!
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