select id, front, back, stop_showing, current_deck from cards
where user_id = $1
and current_deck = true
order by front;