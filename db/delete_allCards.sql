delete from cards where user_id = $1;

select id, front, back, stop_showing, show_less from cards
where user_id = $1
order by front;