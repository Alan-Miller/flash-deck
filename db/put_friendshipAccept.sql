update friendships set friendship_formed = TRUE
where inviter_id = $1 AND invitee_id = $2;