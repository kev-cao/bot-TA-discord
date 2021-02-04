// qpeek.js
// Shows the first 5 members in a specific queues.
module.exports.description = "Displays the number of users in a specified queue and shows the next five.";

module.exports.run = (client, message, args) => {
  if (args.length <= 0) {
    message.reply("please provide the index of the queue you wish to peek into.");
    return;
  }

  message.channel.send(client.queueManager.peekQueue(parseInt(args)));
};


