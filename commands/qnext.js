// next.js
// Gets the next person in line and removes them from the queue.
const adminCheck = require("../lib/adminCheck.js");

module.exports.run = (client, message, args) => {
  const channel = message.channel;

  if (!adminCheck.hasAdmin(client, message)) {
    return;
  }

  const queue = client.queue;

  const next = queue.shift(); // Get the next member.

  // Notify the user.
  if (next !== undefined) {
    channel.send(`May the following user come forth:\n**User:** ${next.user.toString()}\n**Name:** ${next.name}`);
  } else {
    channel.send("The queue is empty.");
  }
}
