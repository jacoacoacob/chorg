SET
  statement_timeout = 0;

SET
  lock_timeout = 0;

SET
  idle_in_transaction_session_timeout = 0;

SET
  client_encoding = 'UTF8';

SET
  standard_conforming_strings = ON;

SELECT
  pg_catalog.set_config ('search_path', '',FALSE);

SET
  check_function_bodies = FALSE;

SET
  xmloption = CONTENT;

SET
  client_min_messages = warning;

SET
  row_security = OFF;

CREATE EXTENSION IF NOT EXISTS "pg_net"
WITH
  SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgsodium"
WITH
  SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql"
WITH
  SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements"
WITH
  SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto"
WITH
  SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt"
WITH
  SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault"
WITH
  SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
WITH
  SCHEMA "extensions";

CREATE
OR REPLACE FUNCTION "public"."handle_new_user" () RETURNS "trigger" LANGUAGE "plpgsql" SECURITY DEFINER AS $$
BEGIN
    INSERT INTO public.profiles (id, avatar_url)
    VALUES (new.id, new.raw_user_meta_data->>'avatar_url');

    RETURN new;
END;
$$;

ALTER FUNCTION "public"."handle_new_user" () OWNER TO "postgres";

SET
  default_tablespace = '';

SET
  default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS
  "public"."chore" (
    "id" "uuid" DEFAULT "gen_random_uuid" () NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT "now" () NOT NULL,
    "display_name" "text" NOT NULL,
    "owner" "uuid"
  );

ALTER TABLE "public"."chore" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS
  "public"."chore_chart" (
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT "now" () NOT NULL,
    "group" "uuid",
    "owner" "uuid",
    "chore_set" "uuid",
    "start" "date",
    "end" "date",
    "id" "uuid" DEFAULT "gen_random_uuid" () NOT NULL
  );

ALTER TABLE "public"."chore_chart" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS
  "public"."chore_chart_completion" (
    "id" "uuid" DEFAULT "gen_random_uuid" () NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT "now" () NOT NULL,
    "chore_chart" "uuid",
    "chore_task" "uuid",
    "owner" "uuid"
  );

ALTER TABLE "public"."chore_chart_completion" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS
  "public"."chore_chore_task" (
    "id" "uuid" DEFAULT "gen_random_uuid" () NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT "now" () NOT NULL,
    "chore_id" "uuid",
    "chore_task_id" "uuid"
  );

ALTER TABLE "public"."chore_chore_task" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS
  "public"."chore_set" (
    "id" "uuid" DEFAULT "gen_random_uuid" () NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT "now" () NOT NULL,
    "display_name" "text" NOT NULL,
    "owner" "uuid"
  );

ALTER TABLE "public"."chore_set" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS
  "public"."chore_set_chore" (
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT "now" () NOT NULL,
    "chore_set_id" "uuid",
    "chore_id" "uuid",
    "id" "uuid" DEFAULT "gen_random_uuid" ()
  );

ALTER TABLE "public"."chore_set_chore" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS
  "public"."chore_task" (
    "id" "uuid" DEFAULT "gen_random_uuid" () NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT "now" () NOT NULL,
    "description" "text",
    "owner" "uuid" DEFAULT "auth"."uid" ()
  );

ALTER TABLE "public"."chore_task" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS
  "public"."group" (
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT "now" () NOT NULL,
    "owner" "uuid" DEFAULT "auth"."uid" (),
    "display_name" "text",
    "id" "uuid" DEFAULT "gen_random_uuid" () NOT NULL
  );

ALTER TABLE "public"."group" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS
  "public"."group_chore_set" (
    "id" "uuid" DEFAULT "gen_random_uuid" () NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT "now" () NOT NULL,
    "group_id" "uuid",
    "chore_id" "uuid"
  );

ALTER TABLE "public"."group_chore_set" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS
  "public"."group_user" (
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT "now" () NOT NULL,
    "group_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL
  );

ALTER TABLE "public"."group_user" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS
  "public"."profiles" (
    "id" "uuid" NOT NULL,
    "updated_at" TIMESTAMP WITH TIME ZONE,
    "display_name" "text",
    "avatar_url" "text",
    "website" "text",
    CONSTRAINT "display_name_length" CHECK (("char_length" ("display_name") >= 3))
  );

ALTER TABLE "public"."profiles" OWNER TO "postgres";

ALTER TABLE ONLY "public"."chore_chart_completion"
ADD CONSTRAINT "chore_chart_completion_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."chore_chart"
ADD CONSTRAINT "chore_chart_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."chore_chore_task"
ADD CONSTRAINT "chore_chore_task_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."chore"
ADD CONSTRAINT "chore_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."chore_set"
ADD CONSTRAINT "chore_set_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."chore_task"
ADD CONSTRAINT "chore_task_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."group_chore_set"
ADD CONSTRAINT "group_chore_set_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."group"
ADD CONSTRAINT "group_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."group_user"
ADD CONSTRAINT "group_user_pkey" PRIMARY KEY ("group_id", "user_id");

ALTER TABLE ONLY "public"."profiles"
ADD CONSTRAINT "profiles_display_name_key" UNIQUE ("display_name");

ALTER TABLE ONLY "public"."profiles"
ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."chore_chart"
ADD CONSTRAINT "chore_chart_chore_set_fkey" FOREIGN KEY ("chore_set") REFERENCES "public"."chore_set" ("id");

ALTER TABLE ONLY "public"."chore_chart_completion"
ADD CONSTRAINT "chore_chart_completion_chore_chart_fkey" FOREIGN KEY ("chore_chart") REFERENCES "public"."chore_chart" ("id");

ALTER TABLE ONLY "public"."chore_chart_completion"
ADD CONSTRAINT "chore_chart_completion_chore_task_fkey" FOREIGN KEY ("chore_task") REFERENCES "public"."chore_task" ("id");

ALTER TABLE ONLY "public"."chore_chart_completion"
ADD CONSTRAINT "chore_chart_completion_owner_fkey" FOREIGN KEY ("owner") REFERENCES "auth"."users" ("id");

ALTER TABLE ONLY "public"."chore_chart"
ADD CONSTRAINT "chore_chart_group_fkey" FOREIGN KEY ("group") REFERENCES "public"."group" ("id");

ALTER TABLE ONLY "public"."chore_chart"
ADD CONSTRAINT "chore_chart_owner_fkey" FOREIGN KEY ("owner") REFERENCES "auth"."users" ("id");

ALTER TABLE ONLY "public"."chore_chore_task"
ADD CONSTRAINT "chore_chore_task_chore_id_fkey" FOREIGN KEY ("chore_id") REFERENCES "public"."chore" ("id");

ALTER TABLE ONLY "public"."chore_chore_task"
ADD CONSTRAINT "chore_chore_task_chore_task_id_fkey" FOREIGN KEY ("chore_task_id") REFERENCES "public"."chore_task" ("id");

ALTER TABLE ONLY "public"."chore"
ADD CONSTRAINT "chore_owner_fkey" FOREIGN KEY ("owner") REFERENCES "auth"."users" ("id");

ALTER TABLE ONLY "public"."chore_set_chore"
ADD CONSTRAINT "chore_set_chore_chore_id_fkey" FOREIGN KEY ("chore_id") REFERENCES "public"."chore" ("id");

ALTER TABLE ONLY "public"."chore_set_chore"
ADD CONSTRAINT "chore_set_chore_chore_set_id_fkey" FOREIGN KEY ("chore_set_id") REFERENCES "public"."chore_set" ("id");

ALTER TABLE ONLY "public"."chore_set"
ADD CONSTRAINT "chore_set_owner_fkey" FOREIGN KEY ("owner") REFERENCES "auth"."users" ("id");

ALTER TABLE ONLY "public"."chore_task"
ADD CONSTRAINT "chore_task_owner_fkey" FOREIGN KEY ("owner") REFERENCES "auth"."users" ("id");

ALTER TABLE ONLY "public"."group_chore_set"
ADD CONSTRAINT "group_chore_set_chore_id_fkey" FOREIGN KEY ("chore_id") REFERENCES "public"."chore" ("id");

ALTER TABLE ONLY "public"."group_chore_set"
ADD CONSTRAINT "group_chore_set_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."group" ("id");

ALTER TABLE ONLY "public"."group"
ADD CONSTRAINT "group_owner_fkey" FOREIGN KEY ("owner") REFERENCES "auth"."users" ("id");

ALTER TABLE ONLY "public"."group_user"
ADD CONSTRAINT "group_user_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."group" ("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."group_user"
ADD CONSTRAINT "group_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."profiles" ("id");

ALTER TABLE ONLY "public"."profiles"
ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users" ("id") ON DELETE CASCADE;

CREATE POLICY "Enable delete for group members" ON "public"."group_user" FOR DELETE USING (
  (
    "group_id" IN (
      SELECT
        "group_user_1"."group_id"
      FROM
        "public"."group_user" "group_user_1"
      WHERE
        ("group_user_1"."user_id" = "auth"."uid" ())
    )
  )
);

CREATE POLICY "Enable delete for group owners" ON "public"."group" FOR DELETE USING (("auth"."uid" () = "owner"));

CREATE POLICY "Enable insert for authenticated users only" ON "public"."group" FOR INSERT TO "authenticated"
WITH
  CHECK (TRUE);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."group_user" FOR INSERT TO "authenticated"
WITH
  CHECK (TRUE);

CREATE POLICY "Enable read access for all group members" ON "public"."group_user" FOR
SELECT
  USING (
    (
      "group_id" IN (
        SELECT
          "group_user_1"."group_id"
        FROM
          "public"."group_user" "group_user_1"
        WHERE
          ("group_user_1"."user_id" = "auth"."uid" ())
      )
    )
  );

CREATE POLICY "Enable read access for group members and owner" ON "public"."group" FOR
SELECT
  USING (
    (
      (
        "id" IN (
          SELECT
            "group_user"."group_id"
          FROM
            "public"."group_user"
          WHERE
            ("group_user"."user_id" = "auth"."uid" ())
        )
      )
      OR ("auth"."uid" () = "owner")
    )
  );

CREATE POLICY "Enable update for group members" ON "public"."group" FOR
UPDATE USING (
  (
    "id" IN (
      SELECT
        "group_user"."group_id"
      FROM
        "public"."group_user"
      WHERE
        ("group_user"."user_id" = "auth"."uid" ())
    )
  )
)
WITH
  CHECK (
    (
      "id" IN (
        SELECT
          "group_user"."group_id"
        FROM
          "public"."group_user"
        WHERE
          ("group_user"."user_id" = "auth"."uid" ())
      )
    )
  );

CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR
SELECT
  USING (TRUE);

CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT
WITH
  CHECK (("auth"."uid" () = "id"));

CREATE POLICY "Users can update own profile." ON "public"."profiles" FOR
UPDATE USING (("auth"."uid" () = "id"));

ALTER TABLE "public"."chore" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."chore_chart" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."chore_chart_completion" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."chore_chore_task" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."chore_set" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."chore_set_chore" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."chore_task" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."group" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."group_chore_set" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."group_user" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "anon";

GRANT USAGE ON SCHEMA "public" TO "authenticated";

GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user" () TO "anon";

GRANT ALL ON FUNCTION "public"."handle_new_user" () TO "authenticated";

GRANT ALL ON FUNCTION "public"."handle_new_user" () TO "service_role";

GRANT ALL ON TABLE "public"."chore" TO "anon";

GRANT ALL ON TABLE "public"."chore" TO "authenticated";

GRANT ALL ON TABLE "public"."chore" TO "service_role";

GRANT ALL ON TABLE "public"."chore_chart" TO "anon";

GRANT ALL ON TABLE "public"."chore_chart" TO "authenticated";

GRANT ALL ON TABLE "public"."chore_chart" TO "service_role";

GRANT ALL ON TABLE "public"."chore_chart_completion" TO "anon";

GRANT ALL ON TABLE "public"."chore_chart_completion" TO "authenticated";

GRANT ALL ON TABLE "public"."chore_chart_completion" TO "service_role";

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

GRANT ALL ON TABLE "public"."group_user" TO "anon";

GRANT ALL ON TABLE "public"."group_user" TO "authenticated";

GRANT ALL ON TABLE "public"."group_user" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";

GRANT ALL ON TABLE "public"."profiles" TO "authenticated";

GRANT ALL ON TABLE "public"."profiles" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public"
GRANT ALL ON SEQUENCES TO "postgres";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public"
GRANT ALL ON SEQUENCES TO "anon";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public"
GRANT ALL ON SEQUENCES TO "authenticated";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public"
GRANT ALL ON SEQUENCES TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public"
GRANT ALL ON FUNCTIONS TO "postgres";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public"
GRANT ALL ON FUNCTIONS TO "anon";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public"
GRANT ALL ON FUNCTIONS TO "authenticated";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public"
GRANT ALL ON FUNCTIONS TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public"
GRANT ALL ON TABLES TO "postgres";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public"
GRANT ALL ON TABLES TO "anon";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public"
GRANT ALL ON TABLES TO "authenticated";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public"
GRANT ALL ON TABLES TO "service_role";

RESET ALL;