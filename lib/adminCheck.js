// adminCheck.js
// Checks if user that sent a message has administrative permissions.

module.exports.hasAdmin = (client, message) => {
  if (!message.member.hasPermission(client.config.permission)) {
    message.channel.send("You do not have permission to use this command.");
    return false;
  }

  return true;
}
