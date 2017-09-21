select id, name from collections
join cards_in_collections
on collections(id) = cards_in_collections(collections_id)
where collections(user_id) = $1
and cards_in_collections(cards_id) = $2
order by name asc;