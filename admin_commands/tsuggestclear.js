// tsuggestclear.js
// Clears all suggestions.
module.exports.description = "Removes all suggestions from the suggestions list.";
const adminCheck = require("../lib/adminCheck.js");

module.exports.run = (client, message, args) => {
  const channel = message.channel;
  if (!adminCheck.hasAdmin(client, message)) {
    return;
  }

  // Clear the suggestions list.
  client.suggestions = [];
  channel.send("All suggestions have been cleared.");
}
