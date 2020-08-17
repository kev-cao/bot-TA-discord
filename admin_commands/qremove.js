// remove.js
// Removes a specified user from the queue.
module.exports.description = "Removes a specified user/list of users from the queue. Must use @mentions to specify user.";
const qOperation = require("../lib/queue.js");
const adminCheck = require("../lib/adminCheck.js");

module.exports.run = (client, message, args) => {
  const channel = message.channel;

  if (!adminCheck.hasAdmin(client, message)) {
    return;
  }

  const usersToRemove = message.mentions.members
  // Must have mentioned a user to kick.
  if (usersToRemove.length == 0) {
    channel.send(`You must provide a user or list of users to remove (\`${client.config.prefix}remove *@User*\`).`);
    return;
  }

  // Remove all mentioned users.
  usersToRemove.forEach(user => { qOperation.remove(client.queue, user); });
  channel.send("Specified users removed.");
} 
