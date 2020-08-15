// topic.js
// Contains shared functions for manipulating client.topics.
const numToWord = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

const printTopics = (client, channel) => {
  const topics = client.topics;
  let str = "";

  if (topics.length === 0) {
    str = "There are no topics to list.";
  } else {
    str = "__**List of Topics**__\n";

    topics.forEach((title, index) => str += `> ${index}. ${title}\n`);
    str += "\nReact to the respective icon below to subscribe to the topic!";
  }
  channel.send(str);
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

module.exports.printTopics = printTopics;
module.exports.printSuggestions = printSuggestions;
