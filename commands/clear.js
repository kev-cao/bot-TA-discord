// clear.js
// Clears the queue.
module.exports.run = (client, message, args) => {
  const queue = client.queue;

  // User must have administrative powers.
  if (!message.member.hasPermission(client.config.permission)) {
    message.channel.send("You do not have permission to use this command.");
    return;
  }

  // Clear the queue.
  client.queue = [];
  message.channel.send("The queue has been cleared.");
}
