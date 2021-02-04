// Creates a queue.
module.exports.description = "Creates a queue with a given name.";

module.exports.run = (client, message, args) => {
  args = args.split(/[ \n]+/g).join(" ");
  // User must have also provided a name.
  if (args.length <= 0) {
    message.reply(`provide a name for this new queue.`);
    return;
  }

  message.channel.send(client.queueManager.createQueue(args));
};


