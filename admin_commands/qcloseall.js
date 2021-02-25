// qcloseall.js
// Closes all the queues.
module.exports.description = "Closes all queues.";

module.exports.run = (client, message, args) => {
  const channel = message.channel;

  // Clear the queue.
  channel.send(client.queueManager.closeAllQueues());
}
