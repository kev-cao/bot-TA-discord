// remove.js
// Removes a specified user from the queue.
module.exports.description = "Removes a specified user/list of users from their queue. Must use @mentions to specify user.";
const qOperation = require("../lib/queue.js");

module.exports.run = (client, message, args) => {
  const channel = message.channel;

  const usersToRemove = message.mentions.members
  // Must have mentioned a user to kick.
  if (usersToRemove.length == 0) {
    channel.send(`You must provide a user or list of users to remove (\`${client.config.prefix}remove *@User*\`).`);
    return;
  }

  // Remove all mentioned users.
  channel.send(client.queueManager.removeUsers(usersToRemove));
} 
