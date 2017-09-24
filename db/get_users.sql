select * from users
where id != $1
and (
  username ilike '%' || $2 || '%'
  or display_name ilike '%' || $2 || '%'
)
order by display_name;