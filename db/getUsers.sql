select * from users
where username ilike '%' || $1 || '%'
or display_name ilike '%' || $1 || '%';