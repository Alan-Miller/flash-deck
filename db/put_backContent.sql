update cards 
set back = $1
where id = $2;

select * from cards
where user_id = $3
order by id;




-- CREATE OR REPLACE FUNCTION foo($1 regclass)
--   RETURNS void AS
-- $func$
-- BEGIN
--    EXECUTE 'update cards set '|| $1 ||
--    ' = $2 
--    where id = $3';
-- END
-- $func$  LANGUAGE plpgsql;

-- execute format('
--   update cards 
--   set $1 = $2
--   where id = $3
-- ')
-- using
-- -- select * from cards
-- -- where user_id = $4
-- -- order by id;

-- execute 'update cards set '
-- quote_ident($1)
-- ' = '
-- quote_literal($2)
-- ' where id = '
-- quote_literal($3);

-- select * from cards
-- where user_id = $4
-- order by id;