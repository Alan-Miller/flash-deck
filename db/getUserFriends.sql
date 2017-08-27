select display_name from friendships
join users
on users.id = friendships.inviter_id 
    or users.id = friendships.invitee_id
where users.id != $1
    and (inviter_id = $1 or invitee_id = $1)
    and friendship_formed = TRUE;