insert into friendships (inviter_id, invitee_id)
select $1, $2
where not exists (select * from friendships
         where (inviter_id = $1 and invitee_id = $2) 
            or (inviter_id = $2 and invitee_id = $1));

-- select display_name from friendships
-- join users
-- on users.id = friendships.inviter_id or users.id = friendships.invitee_id
-- where users.id != $1
--     and (inviter_id = $1 or invitee_id = $1)
--     and friendship_formed = FALSE;


-- $insert = "insert into friendships (inviter_id, invitee_id) select ($1, $2)";
-- $upsert = "update friendships set invitee_id = $2 
-- where invitee_id = $1 and invitee_id = $2";
-- with upsert as ($upsert returning *) $insert where not exists (select * from upsert);

-- insert into friendships (inviter_id, invitee_id) 
-- values ($1, $2)
-- on conflict do nothing;

-- UPDATE
-- update friendships
-- set inviter_id = 2, invitee_id = 1
-- where exists (select * from friendships 
--              where (inviter_id = 1 and invitee_id = 2) or (inviter_id = 2 and invitee_id = 1))


