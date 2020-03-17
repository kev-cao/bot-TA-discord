
# QueueBot

A Discord bot that maintains a queue of users. Moderators may remove from the queue.

### Required Modules
> discord.js <br /> enmap.js

<br />

### Commands
Here is the current list of commands (all commands must be called with the prefix "q!"):
```
join 'Name' 	        - Adds a user to the queue with the provided name.
leave 			- Removes the user from the queue.
list	               	- Lists the number of users in the queue, and lists the next five members of the queue.
pos		  	- Gets the position of the user in the queue.
help			- Lists this list.
```

<br />

There are also some administrative commands that may be used by the moderators of the server only.
The minimum required permissions may be edited in a config.json file.
```
next			- Gets and removes the next user from the queue.
clear			- Clears the queue.
remove '@Users'         - Removes a specified user/list of users from the queue.
```

<br />

### Required Config File
You will have to create a `config.json` file with the following keys:
```
token:			The discord bot token.
prefix:			The prefix for all commands.
permission:		The minimum permission level required to use administrative commands.
```
