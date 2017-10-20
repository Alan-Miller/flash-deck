delete from cards_in_collections where cards_id = $1;
delete from cards where id = $1;

select id, front, back, stop_showing, current_deck from cards
where user_id = $2
order by front;