// tadd.js
// Adds a list of topics to the topics list.
const adminCheck = require("../lib/adminCheck.js");

module.exports.run = (client, message, args) => {
  const channel = message.channel;
  if (!adminCheck.hasAdmin(client, channel)) {
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
}
