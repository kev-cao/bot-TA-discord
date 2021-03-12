// clear.js
// Clears the queue.
module.exports.description = "Clears the specified queue.";

module.exports.run = (client, message, args) => {
  const channel = message.channel;

  if (args.length <= 0) {
    message.reply("please provide the queue index of the queue you wish to clear.");
    return;
  }

  // Clear the queue.
  channel.send(client.queueManager.clearQueue(parseInt(args)));
}
