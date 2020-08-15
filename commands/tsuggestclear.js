// tsuggestclear.js
// Clears all suggestions.
const adminCheck = require("../lib/adminCheck.js");

module.exports.run = (client, message, args) => {
  const channel = message.channel;
  if (!adminCheck.hasAdmin(client, channel)) {
    return;
  }

  // Clear the suggestions list.
  client.suggestions = [];
  message.channel.send("All suggestions have been cleared.");
}
