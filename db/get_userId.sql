insert into users (auth_id)
select $1
where not exists (select * from users where auth_id = $1);

select id from users 
where auth_id = $1;