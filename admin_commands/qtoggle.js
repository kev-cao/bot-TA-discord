// qtoggle.js
// Toggles the locked state of a queue..
module.exports.description = "Toggles the specified queue's lock state.";

module.exports.run = (client, message, args) => {
  const channel = message.channel;

  if (args.length <= 0) {
    message.reply("please provide the index of the queue you wish to join. To see all queues, do `!qlist`.");
    return;
  }

  // Clear the queue.
  channel.send(client.queueManager.toggleLockQueue(parseInt(args)));
}
