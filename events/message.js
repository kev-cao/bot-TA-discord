// message.js
module.exports = (client, message) => {
  // Ignore all bots to avoid loops.
  if (message.author.bot) {
    return;
  }

  // Message must start with the prefix defined in config.json
  const prefix = client.config.prefix
  if (message.content.slice(0, prefix.length) !== prefix) {
    return;
  }

  // Extract command and arguments from message.
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase(); // Convert to lowercase for easy matching.

  const exec = client.commands.get(command); // The function to execute based on this command.

  // Execute the command.
  if (!exec) {
    message.channel.send(`\"${command}\" is not a valid command. Please see \"${prefix}help\" for the list of commands.`);
  } else {
    exec.run(client, message, args);
  }
}
