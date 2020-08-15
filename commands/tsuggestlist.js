// tsuggestlist.js
// Lists all current suggestions.
const topicOp = require("../lib/topic.js"); // Module for topic operations.

module.exports.run = (client, message, args) => {
  topicOp.printSuggestions(client, message.channel);
}
