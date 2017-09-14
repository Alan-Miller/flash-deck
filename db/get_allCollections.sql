select id, name from collections
where user_id = $1
order by name asc;