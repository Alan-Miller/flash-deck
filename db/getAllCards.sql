select id, front, back, stop_showing, show_less from cards
where user_id = $1
order by id;