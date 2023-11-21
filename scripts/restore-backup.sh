
psql \
    --single-transaction \
    --variable ON_ERROR_STOP=1 \
    --file "$BACKUP_DIR/roles.sql" \
    --file "$BACKUP_DIR/schema.sql" \
    --command 'SET session_replication_role = replica' \
    --file "$BACKUP_DIR/data.sql" \
    --dbname $SUPABASE_DB_URL
