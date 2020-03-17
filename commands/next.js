// next.js
// Gets the next person in line and removes them from the queue.
module.exports.run = (client, message, args) => {
  const channel = message.channel;
  const queue = client.queue;

  // User must have administrative powers.
  if (!message.member.hasPermission(client.config.permission)) {
    channel.send("You do not have permission to use this command.");
    return;
  }

  const next = queue.shift(); // Get the next member.

  // Notify the user.
  if (next !== undefined) {
    channel.send(`May the following user come forth:\n**User:** ${next.user.toString()}\n**Name:** ${next.name}`);
  } else {
    channel.send("The queue is empty.");
  }
}
