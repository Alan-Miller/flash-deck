insert into collections (user_id, name, description)
values ($1, $2, $3);

select id, name, description from collections
where user_id = $1
order by name asc;