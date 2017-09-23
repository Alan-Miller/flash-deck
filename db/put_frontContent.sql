update cards 
set front = $1
where id = $2;

select * from cards
where user_id = $3
order by front asc;