// raw.js
// Occurs anytime anything happens on the server.
// Used for assigning roles based on reaction to topics.
module.exports = (client, packet) => {
  // Only run on related reaction packets and on non-bot reactions.
  if (['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t) && !packet.d.member.user.bot) {
    // Get channel of message.
    const channel = client.channels.cache.get(packet.d.channel_id);

    // Check if message being reacted to is cached. If not, then cache it.
    // If the message is already cached, the reaction events will autofire.
    if (!channel.messages.cache.has(packet.d.message_id)) {
      channel.messages.fetch()
        .then(messages => {
          const reactedMsg = messages.find(msg => msg.id === packet.d.message_id);
          // Get the emoji that the user reacted with.
          const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;

          // Get the reaction object to pass to the event handler.
          const reaction = reactedMsg.reactions.cache.get(emoji);
          
          // Add currently reacting user to reaction's list of users.
          const reactingUser =  client.users.cache.get(packet.d.user_id);
          if (reaction) {
            reaction.users.cache.set(packet.d.user_id, reactingUser);
          }
          
          // Emit corresponding event.
          if (packet.t === 'MESSAGE_REACTION_ADD') {
            client.emit('messageReactionAdd', reaction, reactingUser);
          } else {
            client.emit('messageReacitonRemove', reaction, reactingUser);
          }
        })
        .catch(console.error);
    } else {
      // const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
      // const reaction = channel.messages.cache.get(packet.d.message_id).reactions.cache.get(emoji);
      // console.log(reaction.users.cache.array().map(usr => usr.username));
    }
  }
}

