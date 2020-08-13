// removeAllStudents.js
// Removes all students from the server.
const adminCheck = require("../lib/adminCheck.js");

module.exports.run = (client, message, args) => {
  if (!adminCheck.hasAdmin(client, message)) {
    return;
  }

  message.reply('this command will remove all members with the Student role. This is only meant to be used at the end of the semester when all students are to be removed from the server.\nIf you could like to continue, confirm with \'**REMOVE**\'.');

  // First argument is a filter. Ensure that the confirmation message is from the same user that asked to remove all students.
  // Second argument states that the bot will only accept one message, and that after 15 seconds, the promise is returned.
  message.channel.awaitMessages(msg => msg.author.id == message.author.id, {max: 1, time: 15000}).then(msg => {
    if (msg.first().content == 'REMOVE') {
      message.channel.send('Removing all students...');

      message.guild.members.cache.each(member => {
        if (typeof member.roles.cache.find(r => r.name === "Student") !== 'undefined') {
          member.kick();
        }
      });
    } else {
      message.channel.send('Request cancelled.');
    }
  }).catch(() => {
    message.channel.send('Request timed out.');
  });
};
