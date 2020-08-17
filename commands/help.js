// help.js
// Outputs usable commands.
module.exports.description = "Lists all available commands and how to use them.";

const filesys = require("fs");
const commandNameSpacing = 25;
let helpMsg = "";
let adminHelpMsg = "";

// Creates the help message from the given directory. This allows the bot to only have to create it once per loadup.
async function createHelpMsgBody(client, dir) {
  // Creating a promise out of fs.readdir because it uses callbacks instead of promises.
  return new Promise((resolve, reject) => {
    // Read through all of the files to get the command names and descriptions.
    return filesys.readdir(`./${dir}/`, (err, files) => {
      if (err) {
        return reject(err);
      }

      let msg = "\`\`\`ini\n";

      // Loop through each file and create the respective entry for the command.
      files.forEach(file => {
        if (!file.endsWith(".js")) {
          return;
        }

        let exec = require(`../${dir}/${file}`);
        let commandName = "[" + file.split(".")[0] + "]";

        msg += commandName.padEnd(commandNameSpacing, " ");
        msg += exec.description + "\n\n";
      });
      msg = msg.substring(0, msg.length - 1);
      msg += "\`\`\`";
      resolve(msg);
    });
  });
}


module.exports.run = async (client, message, args) => {
  if (helpMsg === "" || adminHelpMsg === "") {
    helpMsg = `:grey_question: Make sure to prefix each command with \`${client.config.prefix}\`\n**Commands**\n`;
    helpMsg += await createHelpMsgBody(client, "commands");

    adminHelpMsg = helpMsg + "\n**Admin Commands**\n"
    adminHelpMsg += await createHelpMsgBody(client, "admin_commands");
  }

  message.channel.send(message.member.hasPermission(client.config.permission) ? adminHelpMsg : helpMsg);
}
