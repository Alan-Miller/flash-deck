insert into friendships (inviter_user_id, invitee_user_id)
select $1, $2
where not exists (select * from friendships 
         where (inviter_user_id = $1 and invitee_user_id = $2) or (inviter_user_id = $2 and invitee_user_id = $1))


-- $insert = "insert into friendships (inviter_user_id, invitee_user_id) select ($1, $2)";
-- $upsert = "update friendships set invitee_user_id = $2 
-- where invitee_user_id = $1 and invitee_user_id = $2";
-- with upsert as ($upsert returning *) $insert where not exists (select * from upsert);

-- insert into friendships (inviter_user_id, invitee_user_id) 
-- values ($1, $2)
-- on conflict do nothing;

-- UPDATE
-- update friendships
-- set inviter_user_id = 2, invitee_user_id = 1
-- where exists (select * from friendships 
--              where (inviter_user_id = 1 and invitee_user_id = 2) or (inviter_user_id = 2 and invitee_user_id = 1))


