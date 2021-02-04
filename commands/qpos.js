// pos.js
// Gets the position of the messenger in the queue.
module.exports.description = "Gets the position of the user in their queue."

module.exports.run = (client, message, args) => {
  message.reply(client.queueManager.userPosition(message.member));
}
