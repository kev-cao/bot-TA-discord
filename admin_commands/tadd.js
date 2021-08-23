// tadd.js
// Adds a list of topics to the topics list.
module.exports.description = "Adds topics to the list. Multiple topics should be separated with the pipe character (|).";
const topicOp = require("../lib/topic.js");

module.exports.run = (client, message, args) => {
  const channel = message.channel;

  const topicList = args.split(/\|/g).map(s => s.trim());

  let index = 0;
  while (client.topics.length < 10 && index < topicList.length) {
    client.topics.push([topicList[index++], true]);
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

