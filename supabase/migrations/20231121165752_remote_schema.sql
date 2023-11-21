
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

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."chore" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "display_name" "text" NOT NULL,
    "owner" "uuid"
);

ALTER TABLE "public"."chore" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."chore_chart" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "group" "uuid",
    "owner" "uuid",
    "chore_set" "uuid",
    "start" "date",
    "end" "date",
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);

ALTER TABLE "public"."chore_chart" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."chore_chart_completion" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "chore_chart" "uuid",
    "chore_task" "uuid",
    "owner" "uuid"
);

ALTER TABLE "public"."chore_chart_completion" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."chore_chore_task" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "chore_id" "uuid",
    "chore_task_id" "uuid"
);

ALTER TABLE "public"."chore_chore_task" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."chore_set" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "display_name" "text" NOT NULL,
    "owner" "uuid"
);

ALTER TABLE "public"."chore_set" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."chore_set_chore" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "chore_set_id" "uuid",
    "chore_id" "uuid",
    "id" "uuid" DEFAULT "gen_random_uuid"()
);

ALTER TABLE "public"."chore_set_chore" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."chore_task" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "description" "text",
    "owner" "uuid"
);

ALTER TABLE "public"."chore_task" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."group" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "owner" "uuid",
    "display_name" "text",
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);

ALTER TABLE "public"."group" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."group_chore_set" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "group_id" "uuid",
    "chore_id" "uuid"
);

ALTER TABLE "public"."group_chore_set" OWNER TO "postgres";

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

ALTER TABLE ONLY "public"."chore_chart"
    ADD CONSTRAINT "chore_chart_chore_set_fkey" FOREIGN KEY ("chore_set") REFERENCES "public"."chore_set"("id");

ALTER TABLE ONLY "public"."chore_chart_completion"
    ADD CONSTRAINT "chore_chart_completion_chore_chart_fkey" FOREIGN KEY ("chore_chart") REFERENCES "public"."chore_chart"("id");

ALTER TABLE ONLY "public"."chore_chart_completion"
    ADD CONSTRAINT "chore_chart_completion_chore_task_fkey" FOREIGN KEY ("chore_task") REFERENCES "public"."chore_task"("id");

ALTER TABLE ONLY "public"."chore_chart_completion"
    ADD CONSTRAINT "chore_chart_completion_owner_fkey" FOREIGN KEY ("owner") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."chore_chart"
    ADD CONSTRAINT "chore_chart_group_fkey" FOREIGN KEY ("group") REFERENCES "public"."group"("id");

ALTER TABLE ONLY "public"."chore_chart"
    ADD CONSTRAINT "chore_chart_owner_fkey" FOREIGN KEY ("owner") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."chore_chore_task"
    ADD CONSTRAINT "chore_chore_task_chore_id_fkey" FOREIGN KEY ("chore_id") REFERENCES "public"."chore"("id");

ALTER TABLE ONLY "public"."chore_chore_task"
    ADD CONSTRAINT "chore_chore_task_chore_task_id_fkey" FOREIGN KEY ("chore_task_id") REFERENCES "public"."chore_task"("id");

ALTER TABLE ONLY "public"."chore"
    ADD CONSTRAINT "chore_owner_fkey" FOREIGN KEY ("owner") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."chore_set_chore"
    ADD CONSTRAINT "chore_set_chore_chore_id_fkey" FOREIGN KEY ("chore_id") REFERENCES "public"."chore"("id");

ALTER TABLE ONLY "public"."chore_set_chore"
    ADD CONSTRAINT "chore_set_chore_chore_set_id_fkey" FOREIGN KEY ("chore_set_id") REFERENCES "public"."chore_set"("id");

ALTER TABLE ONLY "public"."chore_set"
    ADD CONSTRAINT "chore_set_owner_fkey" FOREIGN KEY ("owner") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."chore_task"
    ADD CONSTRAINT "chore_task_owner_fkey" FOREIGN KEY ("owner") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."group_chore_set"
    ADD CONSTRAINT "group_chore_set_chore_id_fkey" FOREIGN KEY ("chore_id") REFERENCES "public"."chore"("id");

ALTER TABLE ONLY "public"."group_chore_set"
    ADD CONSTRAINT "group_chore_set_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."group"("id");

ALTER TABLE ONLY "public"."group"
    ADD CONSTRAINT "group_owner_fkey" FOREIGN KEY ("owner") REFERENCES "auth"."users"("id");

ALTER TABLE "public"."chore" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."chore_chart" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."chore_chart_completion" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."chore_chore_task" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."chore_set" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."chore_set_chore" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."chore_task" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."group" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."group_chore_set" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

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
