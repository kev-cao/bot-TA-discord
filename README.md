# QueueBot

A Discord bot that maintains a queue of users. Moderators may remove from the queue.

### Required Modules
> discord.js
> enmap.js


### Commands
Here is the current list of commands (all commands must be called with the prefix "q!"):
```
join 'Name' 	- Adds a user to the queue with the provided name.
leave 			- Removes the user from the queue.
list			- Lists the number of users in the queue, and lists the next five members of the queue.
pos				- Gets the position of the user in the queue.
help			- Lists this list.
```

<br />

There are also some administrative commands that may be used by the moderators of the server only.
```
next			- Gets and removes the next user from the 	queue.
clear			- Clears the queue.
remove 'User' 	- Removes a specified user from the queue.
```
