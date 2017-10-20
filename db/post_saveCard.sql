insert into cards (user_id, front, back)
values ($1, $2, $3);

select id, front, back, stop_showing, current_deck from cards
where user_id = $1
order by front asc;