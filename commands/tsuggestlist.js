// tsuggestlist.js
// Lists all current suggestions.
module.exports.description = "Lists all topic suggestions currently stored.";
const topicOp = require("../lib/topic.js"); // Module for topic operations.

module.exports.run = (client, message, args) => {
  topicOp.printSuggestions(client, message.channel);
}
