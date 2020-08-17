// tadd.js
// Adds a list of topics to the topics list.
module.exports.description = "Adds topics to the list. Multiple topics should be separated with the pipe character (|).";
const adminCheck = require("../lib/adminCheck.js");
const topicOp = require("../lib/topic.js");

module.exports.run = (client, message, args) => {
  const channel = message.channel;
  if (!adminCheck.hasAdmin(client, message)) {
    return;
  }

  topicList = args.split(/\|/g);
  topicList = topicList.map(s => s.trim());

  let index = 0;
  while (client.topics.length < 10 && index < topicList.length) {
    client.topics.push(topicList[index++]);
  }

  let str = "";
  if (index !== topicList.length) {
    str = "Max topic limit hit (10). Added list was truncated. ";
  }

  str += `${index} topics added.`;
  message.channel.send(str);

  if (index > 0) {
    topicOp.updateTopicMessage(client, message.guild);
  }
}
