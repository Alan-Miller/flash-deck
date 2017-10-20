-- delete array of cards
DO
$delete_cards$
declare
  cardz_uhhray int[] = $1;
  cardz_uhhray_len int = array_upper(cardz_uhhray, 1);
begin
  for i in 1..cardz_uhhray_len
    loop
      delete from cards_in_collections where cards_id = cardz_uhhray[i];
      delete from cards where id = cardz_uhhray[i];
    end loop;
end
$delete_cards$;


select id, front, back, stop_showing, current_deck from cards
where user_id = $2
order by front;