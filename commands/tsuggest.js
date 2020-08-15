// tsuggest.js
// Adds a suggestion for the topic list to the suggestions list.
module.exports.run = (client, message, args) => {
  let str = "";
  if (client.suggestions.length >= 10) {
    str = "Max suggestion limit hit (10). Suggestion was not added.";
  } else if (args === "") {
    str = "Please provide a suggestion after the command. (e.g. `!tsuggest suggestion`).";
  } else if (args.length > 30) {
    str = "Character cap hit (30). Suggestion was not added.";
  } else {
    client.suggestions.push(args);
    str = "Suggestion added.";
  }

  message.channel.send(str);
}
