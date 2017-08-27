select display_name from friendships
join users
on users.id = friendships.inviter_user_id 
    or users.id = friendships.invitee_user_id
where users.id != $1
    and (inviter_user_id = $1 or invitee_user_id = $1)
    and friendship_formed = TRUE;