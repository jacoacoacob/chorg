
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
BEGIN
  INSERT INTO public.profiles (id, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'avatar_url');

  RETURN new;
END;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."is_group_member"("_user_id" "uuid", "_group_id" "uuid") RETURNS boolean
    LANGUAGE "sql" SECURITY DEFINER
    AS $$
SELECT EXISTS (
  SELECT 1
  FROM group_member gm
  WHERE gm.group_id = _group_id
  AND gm.user_id = _user_id
);
$$;

ALTER FUNCTION "public"."is_group_member"("_user_id" "uuid", "_group_id" "uuid") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."is_group_owner"("_user_id" "uuid", "_group_id" "uuid") RETURNS boolean
    LANGUAGE "sql" SECURITY DEFINER
    AS $$
SELECT EXISTS (
  SELECT 1
  FROM public.group g
  WHERE g.id = _group_id AND g.owned_by = _user_id
)
$$;

ALTER FUNCTION "public"."is_group_owner"("_user_id" "uuid", "_group_id" "uuid") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."chart" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "owned_by" "uuid" DEFAULT "auth"."uid"(),
    "group_id" "uuid",
    "chore_set_id" "uuid"
);

ALTER TABLE "public"."chart" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."chart_completion" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "chart_id" "uuid",
    "chore_task_id" "uuid",
    "owned_by" "uuid" DEFAULT "auth"."uid"()
);

ALTER TABLE "public"."chart_completion" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."chore" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "owned_by" "uuid" DEFAULT "auth"."uid"(),
    "display_name" "text"
);

ALTER TABLE "public"."chore" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."chore_chore_task" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "chore_id" "uuid" NOT NULL,
    "chore_task_id" "uuid" NOT NULL
);

ALTER TABLE "public"."chore_chore_task" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."chore_set" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "owned_by" "uuid" DEFAULT "auth"."uid"(),
    "display_name" "text"
);

ALTER TABLE "public"."chore_set" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."chore_set_chore" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "chore_set_id" "uuid" NOT NULL,
    "chore_id" "uuid" NOT NULL
);

ALTER TABLE "public"."chore_set_chore" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."chore_task" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "owned_by" "uuid" DEFAULT "auth"."uid"(),
    "description" "text"
);

ALTER TABLE "public"."chore_task" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."group" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "owned_by" "uuid" DEFAULT "auth"."uid"(),
    "display_name" "text"
);

ALTER TABLE "public"."group" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."group_chore_set" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "group_id" "uuid" NOT NULL,
    "chore_set_id" "uuid" NOT NULL
);

ALTER TABLE "public"."group_chore_set" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."group_member" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "group_id" "uuid" NOT NULL
);

ALTER TABLE "public"."group_member" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "updated_at" timestamp with time zone,
    "display_name" "text",
    "avatar_url" "text",
    "website" "text",
    CONSTRAINT "display_name_length" CHECK (("char_length"("display_name") >= 3))
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

ALTER TABLE ONLY "public"."chart_completion"
    ADD CONSTRAINT "chart_completion_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."chart"
    ADD CONSTRAINT "chart_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."chore_chore_task"
    ADD CONSTRAINT "chore_chore_task_pkey" PRIMARY KEY ("chore_id", "chore_task_id");

ALTER TABLE ONLY "public"."chore"
    ADD CONSTRAINT "chore_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."chore_set_chore"
    ADD CONSTRAINT "chore_set_chore_pkey" PRIMARY KEY ("chore_set_id", "chore_id");

ALTER TABLE ONLY "public"."chore_set"
    ADD CONSTRAINT "chore_set_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."chore_task"
    ADD CONSTRAINT "chore_task_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."group_chore_set"
    ADD CONSTRAINT "group_chore_set_pkey" PRIMARY KEY ("group_id", "chore_set_id");

ALTER TABLE ONLY "public"."group_member"
    ADD CONSTRAINT "group_member_pkey" PRIMARY KEY ("user_id", "group_id");

ALTER TABLE ONLY "public"."group"
    ADD CONSTRAINT "group_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_display_name_key" UNIQUE ("display_name");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."chart"
    ADD CONSTRAINT "chart_chore_set_id_fkey" FOREIGN KEY ("chore_set_id") REFERENCES "public"."chore_set"("id") ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."chart_completion"
    ADD CONSTRAINT "chart_completion_chart_id_fkey" FOREIGN KEY ("chart_id") REFERENCES "public"."chart"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."chart_completion"
    ADD CONSTRAINT "chart_completion_chore_task_id_fkey" FOREIGN KEY ("chore_task_id") REFERENCES "public"."chore_task"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."chart_completion"
    ADD CONSTRAINT "chart_completion_owned_by_fkey" FOREIGN KEY ("owned_by") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."chart"
    ADD CONSTRAINT "chart_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."group"("id") ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."chart"
    ADD CONSTRAINT "chart_owned_by_fkey" FOREIGN KEY ("owned_by") REFERENCES "auth"."users"("id") ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."chore_chore_task"
    ADD CONSTRAINT "chore_chore_task_chore_id_fkey" FOREIGN KEY ("chore_id") REFERENCES "public"."chore"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."chore_chore_task"
    ADD CONSTRAINT "chore_chore_task_chore_task_id_fkey" FOREIGN KEY ("chore_task_id") REFERENCES "public"."chore_task"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."chore"
    ADD CONSTRAINT "chore_owned_by_fkey" FOREIGN KEY ("owned_by") REFERENCES "auth"."users"("id") ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."chore_set_chore"
    ADD CONSTRAINT "chore_set_chore_chore_id_fkey" FOREIGN KEY ("chore_id") REFERENCES "public"."chore"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."chore_set_chore"
    ADD CONSTRAINT "chore_set_chore_chore_set_id_fkey" FOREIGN KEY ("chore_set_id") REFERENCES "public"."chore_set"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."chore_set"
    ADD CONSTRAINT "chore_set_owned_by_fkey" FOREIGN KEY ("owned_by") REFERENCES "auth"."users"("id") ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."chore_task"
    ADD CONSTRAINT "chore_task_owned_by_fkey" FOREIGN KEY ("owned_by") REFERENCES "auth"."users"("id") ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."group_chore_set"
    ADD CONSTRAINT "group_chore_set_chore_set_id_fkey" FOREIGN KEY ("chore_set_id") REFERENCES "public"."chore_set"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."group_chore_set"
    ADD CONSTRAINT "group_chore_set_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."group"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."group_member"
    ADD CONSTRAINT "group_member_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."group"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."group_member"
    ADD CONSTRAINT "group_member_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."group"
    ADD CONSTRAINT "group_owned_by_fkey" FOREIGN KEY ("owned_by") REFERENCES "auth"."users"("id") ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

CREATE POLICY "Enable delete for group owner only" ON "public"."group_member" FOR DELETE USING ("public"."is_group_owner"("auth"."uid"(), "group_id"));

CREATE POLICY "Enable delete for group owners" ON "public"."group" FOR DELETE USING ((("auth"."uid"() = "owned_by") OR ("owned_by" IS NULL)));

CREATE POLICY "Enable delete for owners" ON "public"."chore" FOR DELETE USING ((("auth"."uid"() = "owned_by") OR ("owned_by" IS NULL)));

CREATE POLICY "Enable delete for owners" ON "public"."chore_set" FOR DELETE USING ((("auth"."uid"() = "owned_by") OR ("owned_by" IS NULL)));

CREATE POLICY "Enable insert for authenticated users only" ON "public"."chore" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."chore_set" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."group" FOR INSERT TO "authenticated" WITH CHECK (true);

CREATE POLICY "Enable insert for group members only" ON "public"."group_member" FOR INSERT WITH CHECK (("public"."is_group_member"("auth"."uid"(), "group_id") OR "public"."is_group_owner"("auth"."uid"(), "group_id")));

CREATE POLICY "Enable read access for everyone" ON "public"."chore" FOR SELECT USING (true);

CREATE POLICY "Enable read access for everyone" ON "public"."chore_set" FOR SELECT USING (true);

CREATE POLICY "Enable read access for group members and owner" ON "public"."group" FOR SELECT USING ((("id" IN ( SELECT "gm"."group_id"
   FROM "public"."group_member" "gm"
  WHERE ("gm"."user_id" = "auth"."uid"()))) OR ("auth"."uid"() = "owned_by")));

CREATE POLICY "Enable read access for group members only" ON "public"."group_member" FOR SELECT USING (("public"."is_group_member"("auth"."uid"(), "group_id") OR ("auth"."uid"() = "user_id")));

CREATE POLICY "Enable update for group members" ON "public"."group" FOR UPDATE USING (("id" IN ( SELECT "gm"."group_id"
   FROM "public"."group_member" "gm"
  WHERE ("gm"."user_id" = "auth"."uid"())))) WITH CHECK (("id" IN ( SELECT "gm"."group_id"
   FROM "public"."group_member" "gm"
  WHERE ("gm"."user_id" = "auth"."uid"()))));

CREATE POLICY "Enable update for owner" ON "public"."chore" FOR UPDATE USING (("auth"."uid"() = "owned_by")) WITH CHECK (("auth"."uid"() = "owned_by"));

CREATE POLICY "Enable update for owner" ON "public"."chore_set" FOR UPDATE USING (("auth"."uid"() = "owned_by")) WITH CHECK (("auth"."uid"() = "owned_by"));

CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT WITH CHECK (("auth"."uid"() = "id"));

CREATE POLICY "Users can update own profile." ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));

ALTER TABLE "public"."chore" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."chore_set" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."group" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."group_member" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."is_group_member"("_user_id" "uuid", "_group_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_group_member"("_user_id" "uuid", "_group_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_group_member"("_user_id" "uuid", "_group_id" "uuid") TO "service_role";

GRANT ALL ON FUNCTION "public"."is_group_owner"("_user_id" "uuid", "_group_id" "uuid") TO "anon";
GRANT ALL ON FUNCTION "public"."is_group_owner"("_user_id" "uuid", "_group_id" "uuid") TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_group_owner"("_user_id" "uuid", "_group_id" "uuid") TO "service_role";

GRANT ALL ON TABLE "public"."chart" TO "anon";
GRANT ALL ON TABLE "public"."chart" TO "authenticated";
GRANT ALL ON TABLE "public"."chart" TO "service_role";

GRANT ALL ON TABLE "public"."chart_completion" TO "anon";
GRANT ALL ON TABLE "public"."chart_completion" TO "authenticated";
GRANT ALL ON TABLE "public"."chart_completion" TO "service_role";

GRANT ALL ON TABLE "public"."chore" TO "anon";
GRANT ALL ON TABLE "public"."chore" TO "authenticated";
GRANT ALL ON TABLE "public"."chore" TO "service_role";

GRANT ALL ON TABLE "public"."chore_chore_task" TO "anon";
GRANT ALL ON TABLE "public"."chore_chore_task" TO "authenticated";
GRANT ALL ON TABLE "public"."chore_chore_task" TO "service_role";

GRANT ALL ON TABLE "public"."chore_set" TO "anon";
GRANT ALL ON TABLE "public"."chore_set" TO "authenticated";
GRANT ALL ON TABLE "public"."chore_set" TO "service_role";

GRANT ALL ON TABLE "public"."chore_set_chore" TO "anon";
GRANT ALL ON TABLE "public"."chore_set_chore" TO "authenticated";
GRANT ALL ON TABLE "public"."chore_set_chore" TO "service_role";

GRANT ALL ON TABLE "public"."chore_task" TO "anon";
GRANT ALL ON TABLE "public"."chore_task" TO "authenticated";
GRANT ALL ON TABLE "public"."chore_task" TO "service_role";

GRANT ALL ON TABLE "public"."group" TO "anon";
GRANT ALL ON TABLE "public"."group" TO "authenticated";
GRANT ALL ON TABLE "public"."group" TO "service_role";

GRANT ALL ON TABLE "public"."group_chore_set" TO "anon";
GRANT ALL ON TABLE "public"."group_chore_set" TO "authenticated";
GRANT ALL ON TABLE "public"."group_chore_set" TO "service_role";

GRANT ALL ON TABLE "public"."group_member" TO "anon";
GRANT ALL ON TABLE "public"."group_member" TO "authenticated";
GRANT ALL ON TABLE "public"."group_member" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
