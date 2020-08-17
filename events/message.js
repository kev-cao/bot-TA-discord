// message.js
module.exports = (client, message) => {
  // Ignore all bot messages, and check that message is in "queue" channel.
  if (message.author.bot || (message.channel.name != "bot-commands" && message.channel.name != "admin-channel")) {
    return;
  }

  // Message must start with the prefix defined in config.json
  const prefix = client.config.prefix
  if (message.content.slice(0, prefix.length) !== prefix) {
    return;
  }

  // Extract command and arguments from message.
  let args = message.content.slice(prefix.length).trim();

  // Extract command out of args.
  const i = args.search(/[ \n]+/g);
  if (i < 0) {
    var command = args;
    args = "";
  } else {
    command = args.substr(0, i).toLowerCase();
    args = args.substr(i + 1);
  }

  const exec = client.commands.get(command); // The function to execute based on this command.

  // Execute the command.
  if (!exec) {
    message.channel.send(`\"${command}\" is not a valid command. Please see \"${prefix}help\" for the list of commands.`);
  } else {
    exec.run(client, message, args);
  }
}
