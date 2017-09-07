select id, name, description from collections
where user_id = $1
order by name asc;