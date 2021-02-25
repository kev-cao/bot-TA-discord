// tclear.js
// Clears all topics.
module.exports.description = "Clears all topics in the topics list."

const topicOp = require("../lib/topic.js");

module.exports.run = (client, message, args) => {
  const channel = message.channel;

  // Clear all topics.
  client.topics = [];
  channel.send("All topics have been cleared.");
  topicOp.updateTopicMessage(client, message.guild);
}
