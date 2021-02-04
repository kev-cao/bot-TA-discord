// join.js
// Adds the messenger to the queue if they do not exist already.
module.exports.description = "Adds user to a specified queue.";

module.exports.run = (client, message, args) => {
  if (args.length <= 0) {
    message.reply("please provide the index of the queue you wish to join. To see all queues, do `!qlist`.");
    return;
  }

  message.reply(client.queueManager.enqueueUser(parseInt(args), message.member));
};


