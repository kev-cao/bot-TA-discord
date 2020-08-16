const Discord = require("discord.js");
const Enmap = require("enmap");
const filesys = require("fs");

// Create connection client to connect to Discord.
const config = require("./config.json");
const client = new Discord.Client();

// Connect config file to client so that it can be used in other modules.
client.config = config;

/* 
 * Add data structures to store students.
 * Since we're dealing with very small amounts of data, these are all
 * represented with arrays.
 * */
client.queue = []; // Stores students in the regular queue.
client.topics = []; // Stores topics.
client.suggestions = []; // Stores suggestions for topics.


/*
 * The structures for events and commands are as such:
 * 
 * There is a JS module for every event that is being covered.
 * When an event occurs, the respective function in the module for that
 * event is called.
 * Within that module, the data sent with the event is parsed and processed,
 * and then based on the extracted information, the right command is called.
 *
 * There can be more than one command associated with each event (e.g. there are
 * many commands that can be called whenever a message is sent to the bot).
 * 
 * */

// Load events files. (e.g. ready, message, etc.)
filesys.readdir("./events/", (err, files) => {
  // Raise error if there is one.
  if (err) {
    return console.error(err);
  }

  // Process each file.
  files.forEach(file => {
    // Only process JS files.
    if (!file.endsWith(".js")) {
      return;
    }

    // Load event file.
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Loading event \"${eventName}\".`);

    // Link event with the event function. Null is the context (continuation).
    // Everything else are arguments that are passed.
    client.on(eventName, event.bind(null, client));

    // Delete file from cache.
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

// Load commands that events will execute.
client.commands = new Enmap();

// Load commands from files.
filesys.readdir("./commands/", (err, files) => {
  if (err) {
    return console.error(err);
  }

  files.forEach(file => {
    if (!file.endsWith(".js")) {
      return;
    }

    let exec = require(`./commands/${file}`);
    let commandName = file.split(".")[0];

    console.log(`Loading command \"${commandName}\".`);
    client.commands.set(commandName.toLowerCase(), exec);
  });
});

client.login(config.token);
