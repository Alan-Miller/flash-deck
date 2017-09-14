-- insert variable number of rows
DO
$save_cards$
declare
  yoozer_id int = $1;
	uhhray varchar[] = $2;
  array_len int = array_upper(uhhray, 1);
begin
	for i in 1..array_len
    loop
      insert into cards (user_id, front, back)
      values (yoozer_id, uhhray[i][1], uhhray[i][2]);
    end loop;
end
$save_cards$;

-- return all cards
select id, front, back, stop_showing, show_less from cards
where user_id = $1
order by front asc;