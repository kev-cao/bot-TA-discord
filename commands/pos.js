// pos.js
// Gets the position of the messenger in the queue.
const qOperation = require("../lib/queue.js");

module.exports.run = (client, message, args) => {
  // Find the user in the queue.
  const index = qOperation.indexOf(client.queue, message.author);

  if (index !== -1) {
    message.reply(`you are in position ${index + 1}.`);
  } else {
    message.reply(`you are not in the queue. To join the queue, use \"${client.config.prefix}join *Name*\".`);
  }
}
