-- insert variable number of rows
DO
$save_cards$
declare
  usr_id int = $1;
	arry varchar[] = $2;
  array_len int = array_upper(arry, 1);
begin
	for i in 1..array_len
    loop
      insert into cards (user_id, front, back)
      values (usr_id, arry[i][1], arry[i][2]);
    end loop;
end
$save_cards$;

-- return all cards
select id, front, back, stop_showing, show_less from cards
where user_id = $1
order by id;