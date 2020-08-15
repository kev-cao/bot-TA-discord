// adminCheck.js
// Checks if user that sent a message has administrative permissions.
module.exports.hasAdmin = (client, channel) => {
  if (!message.member.hasPermission(client.config.permission)) {
    channel.channel.send("You do not have permission to use this command.");
    return false;
  }

  return true;
}
