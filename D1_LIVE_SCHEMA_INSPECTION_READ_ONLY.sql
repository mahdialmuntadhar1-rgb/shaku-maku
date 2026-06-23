-- READ ONLY D1 SCHEMA INSPECTION

SELECT 'businesses columns' AS section;
PRAGMA table_info(businesses);

SELECT 'posts columns' AS section;
PRAGMA table_info(posts);

SELECT 'users columns' AS section;
PRAGMA table_info(users);

SELECT 'profiles columns' AS section;
PRAGMA table_info(profiles);

SELECT 'businesses indexes' AS section;
PRAGMA index_list(businesses);

SELECT 'posts indexes' AS section;
PRAGMA index_list(posts);

SELECT 'all tables' AS section;
SELECT name, type, sql
FROM sqlite_master
WHERE type IN ('table','index','trigger','view')
ORDER BY type, name;
