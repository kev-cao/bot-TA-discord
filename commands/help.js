// help.js
// Outputs usable commands.
module.exports.run = (client, message, args) => {
  let str = `:grey_question: Make sure to prefix each command with \"${client.config.prefix}\".\n`;
  str += "__**List of commands:**__\n";
  str += "**join *Name*:**    Adds you to the queue with the provided name.\n";
  str += "**leave:**             Removes you from the queue.\n";
  str += "**pos:**                Outputs your position in the queue.\n";
  str += "**list:**                 Lists the number of members in the queue, and the upcoming five members.\n";
  str += "**help:**               Lists this list.";

  if (message.member.hasPermission(client.config.permission)) {
    str += "\n\n__**Administrative Commands:**__\n";
    str += "**next:**                                 Gets and removes the next person in the queue.\n";
    str += "**clear:**                                Clears the queue.\n";
    str += "**remove *@Users*:**           Removes a specified user/list of users from the queue. Must use @mentions to specify user.\n";
    str += "**removeallstudents**      Removes all students from the server.";
  }

  message.channel.send(str);
}
