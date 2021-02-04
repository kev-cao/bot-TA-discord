// leave.js
// Removes a user from the queue.
module.exports.description = "Removes the user from their queue."

module.exports.run = (client, message, args) => {
  message.reply(client.queueManager.leaveQueue(message.member));
}
