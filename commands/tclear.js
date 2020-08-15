// tclear.js
// Clears all topics.
const adminCheck = require("../lib/adminCheck.js");
const topicOp = require("../lib/topic.js");

module.exports.run = (client, message, args) => {
  const channel = message.channel;
  if (!adminCheck.hasAdmin(client, message)) {
    return;
  }

  // Clear all topics.
  client.topics = [];
  channel.send("All topics have been cleared.");
  topicOp.updateTopicMessage(client, message.guild);
}
