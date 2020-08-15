// tpreview.js
const adminCheck = require("../lib/adminCheck.js");
const topicOp = require("../lib/topic.js"); // Module for topic operations.

module.exports.run = (client, message, args) => {
  const channel = message.channel;
  if (!adminCheck.hasAdmin(client, channel)) {
    return;
  }

  topicOp.printTopics(client, channel);
}
