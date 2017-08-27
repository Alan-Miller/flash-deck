update friendships set friendship_formed = TRUE
where inviter_user_id = $1 AND invitee_user_id = $2;