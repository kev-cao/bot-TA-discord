// remove.js
// Removes a specified user from the queue.
const qOperation = require("../lib/queue.js");

module.exports.run = (client, message, args) => {
  const usersToRemove = message.mentions.users
  // Must have mentioned a user to kick.
  if (usersToRemove.length == 0) {
    message.channel.send(`You must provide a user or list of users to remove (\"${client.config.prefix}remove *@User*\").`);
    return;
  }

  // Remove all mentioned users.
  usersToRemove.forEach(user => { qOperation.remove(client.queue, user); });
  message.channel.send("Specified users removed.");
} 
