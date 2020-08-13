// clear.js
// Clears the queue.
const adminCheck = require("../lib/adminCheck.js");

module.exports.run = (client, message, args) => {
  if (!adminCheck.hasAdmin(client, message)) {
    return;
  }

  const queue = client.queue;

  // Clear the queue.
  client.queue = [];
  message.channel.send("The queue has been cleared.");
}
