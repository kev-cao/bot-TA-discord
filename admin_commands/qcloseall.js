// qcloseall.js
// Closes all the queues.
module.exports.description = "Closes all queues.";
const adminCheck = require("../lib/adminCheck.js");

module.exports.run = (client, message, args) => {
  const channel = message.channel;
  if (!adminCheck.hasAdmin(client, message)) {
    return;
  }

  // Clear the queue.
  channel.send(client.queueManager.closeAllQueues());
}