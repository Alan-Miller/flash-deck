update cards 
set stop_showing = 
  (case stop_showing
    when FALSE then TRUE
    when TRUE then FALSE
    END)
where id = $1;

select id, front, back, stop_showing, current_deck from cards
where user_id = $2
order by front asc;