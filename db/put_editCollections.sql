-- insert variable number of rows
DO
$update_collections$
declare
  yoozer_id int = $1;
	cardz_uhhray int[] = $2;
  colekshuns_uhhray int[] = $3;
  cardz_uhhray_len int = array_upper(cardz_uhhray, 1);
  colekshuns_uhhray_len int = array_upper(colekshuns_uhhray, 1);
begin
	for i in 1..cardz_uhhray_len
    loop
      for j in 1..colekshuns_uhhray_len
        loop
          insert into cards_in_collections (user_id, cards_id, collections_id)
          select yoozer_id, cardz_uhhray[i], colekshuns_uhhray[j]
          where not exists (
            select * from cards_in_collections 
              where user_id = $1 
              and cards_id = cardz_uhhray[i]
              and collections_id = colekshuns_uhhray[j]
          );
        end loop;
    end loop;
end
$update_collections$;

-- return all collections
-- select id, name from collections
-- where user_id = $1
-- order by name asc;

select 
  collections.id as "id", 
  collections.name as "name", 
  cards_in_collections.cards_id as "card_id"
from collections
join cards_in_collections
on collections.id = cards_in_collections.collections_id
where collections.user_id = $1
order by collections.name asc;