// messageReactionRemove.js
// Triggers every time a reaction is removed on the server. This one specifically
// triggers on a reaction removed from the topics message.
const topicsOp = require("../lib/topic.js");

module.exports = (client, reaction, user) => {
  const msg = reaction.message; 
  const channel = msg.channel;

  // Only process the reaction if this is the topics message and it's a user reaction.
  if (!user.bot && topicsOp.isTopicsMessage(msg)) {
    // Get respective role for emoji.
    const emoji = reaction.emoji.name;
    const role = channel.guild.roles.cache.find(role => role.name === client.emojiToRole[emoji]);

    // Remove role from user.
    channel.guild.members.cache.get(user.id).roles.remove(role);
  }
}
