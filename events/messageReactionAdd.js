// messageReactionAdd.js
// Triggers every time a reaction is added on the server. This one specifically
// triggers on a reaction added to the topics message.
const topicsOp = require("../lib/topic.js");

module.exports = async (client, reaction, user) => {
  // Get the message and channel this reaction is from.
  const msg = reaction.message; 
  const channel = msg.channel;

  // Only process the reaction if this is the topics message and it's a user reaction.
  if (!user.bot && topicsOp.isTopicsMessage(msg)) {
    // Get respective role for emoji.
    const emoji = reaction.emoji.name;
    const roleName = client.emojiToRole[emoji];
    let role = channel.guild.roles.cache.find(role => role.name === roleName);

    // If role doesn't exist, create the role.
    if (!role) {
      role = await channel.guild.roles.create({
        data: {
          name: roleName
        }});
    }
   
    // Add role to user.
    channel.guild.members.cache.get(user.id).roles.add(role);
  }
}
