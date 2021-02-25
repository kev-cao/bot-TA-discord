// tsuggestclear.js
// Clears all suggestions.
module.exports.description = "Removes all suggestions from the suggestions list.";

module.exports.run = (client, message, args) => {
  const channel = message.channel;
  // Clear the suggestions list.
  client.suggestions = [];
  channel.send("All suggestions have been cleared.");
}
