# Teaching Assistant Bot (I can't believe it's not botTA)

[![License](https://img.shields.io/badge/license-MIT-informational)](https://github.com/defCoding/bot-TA-discord/blob/master/LICENSE)
[![Discord API](https://img.shields.io/badge/api-Discord.js-7289da)](https://discord.js.org/#/)

<p align="center"><img src="https://i.imgur.com/j0B8x8D.png" width="50%" /></p>

A Discord bot that maintains a queue of users and a list of topics that students may subscribe to. Moderators may edit the queue and list of topics.

## Context
During the COVID-19 pandemic, all classes at my university were forced online, and even in the semester after, classes were mostly online, with some being a hybrid of in-person and virtual classes.

At this point, I had been working as an undergraduate instructor for nearly a year, and I wanted to create a bot that could help the instructors better manage office hours. During in-person office hours, I would maintain a queue of students on a whiteboard so that students that requested help first would be addressed first. The bot simulates this by maintaining a queue of students that the students can join, and I can call for the next student easily using the bot. 

Furthermore, office hours would often become so filled with students that helping students one at a time would be too inefficient, and I would instead resort to teaching groups of students that wanted help on the same topics. As such, I added a feature where the bot could publish a list of topics set by the instructors, and students could subscribe to the topics by simply reacting to the published list with the corresponding emojis.

### Features

Here is the current list of commands (all commands must be called with the prefix specified in the config file):
```ini
[help]                   Lists all available commands and how to use them.

[qjoin]                  Adds user to a specified queue.

[qleave]                 Removes the user from their queue.

[qlist]                  List all of the available queues.

[qpeek]                  Displays the number of users in a specified queue and shows the next five.

[qpos]                   Gets the position of the user in their queue.

[tsuggest]               Adds a topic suggestion to the list. Max characters is 30.

[tsuggestlist]           Lists all topic suggestions currently stored.
```

<br />

There are also some administrative commands that may be used by the moderators of the server only.
The minimum required permissions may be edited in a config.json file.
```ini
[qclear]                 Clears the specified queue.

[qclose]                 Closes the specified queue.

[qcloseall]              Closes all queues.

[qcreate]                Creates a queue with a given name.

[qnext]                  Pulls the next person from the specified queue and notifies them.

[qremove]                Removes a specified user/list of users from their queue. Must use @mentions to specify user.

[qtoggle]                Toggles the specified queue to locked/unlocked.

[removeallstudents]      Removes all users with the Student role from the server.

[tadd]                   Adds topics to the list. Multiple topics should be separated with the pipe character (|).

[tclear]                 Clears all topics in the topics list.

[tremove]								 Clears a specified topic.

[tsuggestclear]          Removes all suggestions from the suggestions list.

[tsuggestremove]         Removes a specified suggestion by number from the suggestions list.
```

<br />

### Sample Workflow

The bot manages multiple queues at once. Each student is limited to being in one queue. Students can view all the available queues with `!qlist`. Each queue will be displayed along with an index representing the queue.

__Using the Bot as a Student__

`!qjoin index` will add a student to the specified queue.

`!qpeek index` will show the contents of the queue.

`!qleave` will remove the student from the queue they are in.

`!qpos` will show the position of the student in their queue.

`!tsuggest suggestion` will add a topic suggestion to a list.

`!tsuggestlist` will show all topic suggestions.

__Using the Bot as an Admin__

`!qcreate name` will create a queue, where `name` is the name of the new queue.

`!qclose index` will close the specified queue and `!qcloseall` will close all queues.

`!qtoggle index` will lock/unlock the specified queue.

`!qclear index` clears the specified queue of all students. Should be used at the end of office hours.

`!qnext index` pulls the next student out of the specified queue and sends them an @mention telling them that they are up. Should use this command in the #bot-commands channel so it will send the message there.

`!qremove` will remove a designated person from their queue. It removes anyone that you @mention in the same command.

`!tadd` will add topics to the topics list. You can add multiple topics at once, as long as you separate them with the delimiting character |. For example, !tadd Topic 1 | Topic 2 | Topic 3. This command will have the bot update the message in the #topics channel.

`!tclear` removes all topics from the list. The bot will also remove the message from the #topics channel. Use this if there is an old topic message still in the #topics channel and you need to clear it for the new set of topics.

`!tremove index` will remove the specified topic from the list. It will remove all reactions that are associated with the topic, along with the role.

`!tsuggestclear` will remove all suggestions from the suggestions list.

`!tsuggestremove` will remove a specific suggestion by their position in the list. For example, `!tsuggestremove 4`.

Students can join the queue if they have specific questions that they need individual help on, or smaller questions that don't need an explanation over an entire section of an assignment. We should check the queue every so often, and pull from it when we see fit.

A majority of students just need help over an entire section, which is what the #topics channel is for. They can subscribe to a topic from the list by reacting to the message accordingly When you are ready to teach a certain topic, notify students by doing @Topic(Number). For example, if you are ready to teach the first topic, do @TopicZero in one of the public text channels.

## How to Use
Install of the required NodeJS libraries by running `npm install` in the root directory of the project.

You will have to create a `config.json` file with the following keys:
```
token:			The discord bot token.
prefix:			The prefix for all commands.
permission:		The minimum permission level required to use administrative commands.
```

Sample `config.json`:
```json
{
  "token": "keep this private and do not upload it",
  "prefix": "!",
  "permission": "ADMINISTRATOR"
}
```

The code can only be used if a Discord bot is created on Discord's developer website. Use the token provided by Discord once the bot is created as the value for `token` in the `config.json` file.

## Discord Server Setup

Two text channels will also need to be created in the Discord server. A **#bot-commands** channel is required, as the bot will only accept input from that channel. This helps group up the commands in a single channel so that the commands do not clutter other channels. A **#topics** channel is also required as that is where the bot will public the topics created by the instructors. Optionally, an **#admin-channel** text channel can be created to hide some messages from students. The bot will also accept input from the **#admin-channel**.

Finally, a role for the students will also need to be created, named **Student**. The **Topic** roles will be created automatically when needed.
