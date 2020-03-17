// leave.js
// Removes a user from the queue.
const qOperation = require("../lib/queue.js");

module.exports.run = (client, message, args) => {
  // Remove the user from the queue if the user exists in the queue.
  const index = qOperation.remove(client.queue, message.author);

  if (index !== -1) {
    message.reply("you have been removed from the queue.");
  } else {
    message.reply("you were not in the queue. No changes were made.");
  }
}
