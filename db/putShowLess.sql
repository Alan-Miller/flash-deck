update cards 
set show_less = 
  (case show_less
    when FALSE then TRUE
    when TRUE then FALSE
    END)
where id = $1;

select id, front, back, stop_showing, show_less from cards
where user_id = $2
order by id;