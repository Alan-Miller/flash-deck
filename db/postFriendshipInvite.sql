insert into friendships (inviter_id, invitee_id)
select $1, $2
where not exists (select * from friendships
         where (inviter_id = $1 and invitee_id = $2) 
            or (inviter_id = $2 and invitee_id = $1));

-- UPDATE
-- update friendships
-- set inviter_id = 2, invitee_id = 1
-- where exists (select * from friendships 
--              where (inviter_id = 1 and invitee_id = 2) or (inviter_id = 2 and invitee_id = 1))


