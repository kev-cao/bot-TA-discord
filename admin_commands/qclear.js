// clear.js
// Clears the queue.
module.exports.description = "Clears the queue.";
const adminCheck = require("../lib/adminCheck.js");

module.exports.run = (client, message, args) => {
  const channel = message.channel;
  if (!adminCheck.hasAdmin(client, message)) {
    return;
  }

  // Clear the queue.
  client.queue = [];
  channel.send("The queue has been cleared.");
}
