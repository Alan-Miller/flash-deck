select 
  collections.id as "id", 
  collections.name as "name", 
  cards_in_collections.cards_id as "card_id"
from collections
join cards_in_collections
on collections.id = cards_in_collections.collections_id
where collections.user_id = $1
order by collections.name asc;