select id, front, back, stop_showing, current_deck from cards
where user_id = $1
order by front;