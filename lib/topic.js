// topic.js
// Contains shared functions for manipulating client.topics.
const numToEmoji = ["\u0030\u20E3", "\u0031\u20E3", "\u0032\u20E3", "\u0033\u20E3", "\u0034\u20E3", "\u0035\u20E3",  "\u0036\u20E3", "\u0037\u20E3", "\u0038\u20E3", "\u0039\u20E3"];

const createTopicsMsg = (client) => {
  const topics = client.topics;

  let str = "__**List of Topics**__\n";

  topics.forEach((title, index) => str += `> ${index}. ${title}\n`);
  str += "\nReact to the respective icon below to subscribe to the topic!";

  return str;
}

const printSuggestions = (client, channel) => {
  const suggestions = client.suggestions;
  let str = "";

  if (suggestions.length === 0) {
    str = "There are no suggestions to list.";
  } else {
    str = "__**Suggestions**__\n";
    suggestions.forEach((title, index) => str += `> ${index}. ${title}\n`);
  }
  channel.send(str);
}

const addTopicReactions = (message, startingIndex, endingIndex) => {
  if (startingIndex < endingIndex) {
    message.react(`${numToEmoji[startingIndex]}`).then(addTopicReactions(message, startingIndex + 1, endingIndex)).catch(console.error);
  }
}

// Updates the topics message in the topic channel to the new topics list.
const updateTopicMessage = async (client, guild) => {
  // Get topics channel.
  const topicsChannel = guild.channels.cache.find(channel => channel.name == "topics");
  const topics = client.topics;

  // Get the msg with topics.
  let channelMsgs = await topicsChannel.messages.fetch();
  let topicsMsg = channelMsgs.find(msg => msg.author.bot && msg.content.startsWith("__**List of Topics**__"));
  let oldSize = topicsMsg ? topicsMsg.reactions.cache.array().length : 0; // Size of list prior to update.

  // If topics is empty, delete the message and stop there.
  if (topics.length === 0) {
    topicsMsg.delete();
    return;
  }

  // If the number of topics is <= the old size but greater than 0,
  // then there was an error as user can only clear or add topics.
  // So delete message and resend. Then set oldSize to 0 since it is
  // a fresh message.
  if (topicsMsg && topics.length <= oldSize) {
    topicsMsg.delete();
    topicsMsg = undefined;
    oldSize = 0;
  } 

  // Construct the message based on the topics list.
  const str = createTopicsMsg(client);

  if (topicsMsg) {
    topicsMsg = await topicsMsg.edit(str);
  } else {
    topicsMsg = await topicsChannel.send(str);
  }

  addTopicReactions(topicsMsg, oldSize, topics.length);
}


module.exports.printSuggestions = printSuggestions;
module.exports.updateTopicMessage = updateTopicMessage;
