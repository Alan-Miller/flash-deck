DO
$remove_cards_from_deck$
declare
  cardz_uhhray int[] = $1;
  cardz_uhhray_len int = array_upper(cardz_uhhray, 1);
begin
  for i in 1..cardz_uhhray_len
    loop
      update cards set current_deck = false where id = cardz_uhhray[i];
    end loop;
end
$remove_cards_from_deck$;



select id, front, back, stop_showing, current_deck from cards
where user_id = $2
order by front asc;