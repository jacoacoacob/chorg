# https://supabase.com/docs/guides/platform/migrating-and-upgrading-projects#backup-your-old-database

NOW="$(date +"%y%m%d%H%M%S")"

DIR="$BACKUP_DIR/$NOW"

mkdir $DIR

npx supabase db dump --db-url "$SUPABASE_DB_URL" -f "$DIR/roles.sql" --role-only
npx supabase db dump --db-url "$SUPABASE_DB_URL" -f "$DIR/schema.sql"
npx supabase db dump --db-url "$SUPABASE_DB_URL" -f "$DIR/data.sql" --use-copy --data-only
