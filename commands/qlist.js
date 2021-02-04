// list.js
// Lists all current people in the queue.
module.exports.description = "List all of the available queues."
module.exports.run = (client, message, args) => {
  message.channel.send(client.queueManager.displayQueues());
};
