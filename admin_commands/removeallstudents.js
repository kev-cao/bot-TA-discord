// removeallstudents.js
// Removes all students from the server.
module.exports.description = "Removes all users with the Student role from the server.";

module.exports.run = (client, message, args) => {
  const channel = message.channel;
  message.reply('this command will remove all members with the Student role. This is only meant to be used at the end of the semester when all students are to be removed from the server.\nIf you could like to continue, confirm with \'**REMOVE**\'.');

  // First argument is a filter. Ensure that the confirmation message is from the same user that asked to remove all students.
  // Second argument states that the bot will only accept one message, and that after 15 seconds, the promise is returned.
  channel.awaitMessages(msg => msg.author.id == message.author.id, {max: 1, time: 15000}).then(msg => {
    if (msg.first().content == 'REMOVE') {
      channel.send('Removing all students...');

      message.guild.members.fetch().then(members =>
        members.each(member => {
          if (typeof member.roles.cache.find(r => r.name === "Student") !== 'undefined') {
            member.kick();
          }
        }));
    } else {
      channel.send('Request cancelled.');
    }
  }).catch(() => {
    channel.send('Request timed out.');
  });
};
