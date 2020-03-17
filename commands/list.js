// list.js
// Lists all current people in the queue.
module.exports.run = (client, message, args) => {
  const queue = client.queue;

  // Build string from queue.
  let str = `There are currently ${queue.length} members in the queue.\n`;

  if (queue.length !== 0) {
    str += "__**Next Five in Line**__\n";

    // Get first five members in queue.
    for (let i = 0; i < Math.min(5, queue.length); i++) {
      str += `${i + 1}. ${queue[i].name} (User: ${queue[i].user.username})\n`;
    }
  }

  str = str.slice(0, str.length - 1); // Remove last newline character.
  message.channel.send(str);
};
