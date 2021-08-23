// topic.js
// Contains shared functions for manipulating client.topics.

// Maps numbers to their respective emojis.
const numToEmoji = ["\u0030\u20E3", "\u0031\u20E3", "\u0032\u20E3", "\u0033\u20E3", "\u0034\u20E3", "\u0035\u20E3",  "\u0036\u20E3", "\u0037\u20E3", "\u0038\u20E3", "\u0039\u20E3"];

// Creates the string representation of the topics.
const createTopicsMsg = (client) => {
  const topics = client.topics;

  let str = "__**List of Topics**__\n";

  topics.forEach((title, index) => {
    str += title[1] ? `> ${index}. ${title[0]}\n` : `> ~~${index}. ${title[0]}~~\n` 
  });
  str += "\nReact to the respective icon below to subscribe to the topic!";

  return str;
}


// Sends a suggestions message to the given channel.
const printSuggestions = (client, channel) => {
  const suggestions = client.suggestions;
  let str = "";

  if (suggestions.length === 0) {
    str = "There are no suggestions to list.";
  } else {
    str = "__**Suggestions**__\n";
    suggestions.forEach((title, index) => str += `> ${index}. ${title}\n`);
  }
  channel.send(str);
}

// Adds topic reactions to the given message. Starts at startingIndex and ends at endingIndex.
const addTopicReactions = (message, startingIndex, endingIndex) => {
  if (startingIndex < endingIndex) {
    message.react(`${numToEmoji[startingIndex]}`).then(addTopicReactions(message, startingIndex + 1, endingIndex)).catch(console.error); }
}

// Returns the topics channel for the given guild.
const getTopicsChannel = (guild) => {
  return guild.channels.cache.find(channel => channel.name == "topics");
}

// Returns a boolean stating if the given message is a topics message.
const isTopicsMessage = (msg) => {
  return msg.author.bot && msg.channel.name === "topics" && msg.content.startsWith("__**List of Topics**__");
}

// Gets the topics message from the given topicsChannel.
const getTopicsMessage = async (topicsChannel) => {
  let topicsMsg =  topicsChannel.messages.cache.find(isTopicsMessage);

  // If we can't find the topics msg, make sure that we clear out any old topics message either.
  if (!topicsMsg) {
    let channelMsgs = await topicsChannel.messages.fetch();
    topicsMsg = channelMsgs.find(isTopicsMessage);
  }

  return topicsMsg;
}

const removeAllTopicsRoles = (client, message) => {
  // Get all the reactions on the message.
  message.reactions.cache.each(reaction => {
    const emoji = reaction.emoji.name;
    // Delete the role matching with the emoji.
    let role = message.guild.roles.cache.find(r => r.name === client.emojiToRole[emoji]);
    if (role) {
      role.delete();
    }
  });
}

// We know that each inactive topic maps to a reaction according to the index
// it is at in the topic array.
const getReactionsOfInactives = (client, message) => {
	let topics = client.topics;
	// if the topic is active, we map it to undefined to filter it out later
	// else, we map to its index
	let indexOfInactives = topics
		.map((t, ind) => {
		return t[1] ? null : ind;
	})
		.filter(maybeNum => maybeNum != null);
	// now we get the values of our reactions & make it an array to index easily
	let reactions = message.reactions.cache.values();
	let arrReactions = [...reactions];
	let inactiveEmojis = indexOfInactives.map(ind => client.indexToEmoji[ind]);
	let inactiveReactions = arrReactions.filter(r => inactiveEmojis.includes(r.emoji.name));
	return inactiveReactions;
}

const removeReactionToInactiveTopics = (client, message) => {
	let inactiveReactions = getReactionsOfInactives(client, message);
	let inactiveRoles = inactiveReactions.forEach(r => {
		let emoji = r.emoji.name;
		let role = message.guild.roles.cache.find(r => r.name === client.emojiToRole[emoji]);
		// we delete the role
		if (role) {
			role.delete();
		}
	});

	// we delete the reaction
	inactiveReactions.forEach(reaction => {
		reaction.remove();
	});
}

// Updates the topics message in the topic channel to the new topics list.
const updateTopicMessage = async (client, guild) => {
  // Get topics channel.
  const topicsChannel = getTopicsChannel(guild);
  const topics = client.topics;

  // Get the msg with topics.
  let topicsMsg = await getTopicsMessage(topicsChannel);
	let inactiveTopics = topics.filter(t => !t[1]);
  let oldSize = (topicsMsg ? topicsMsg.reactions.cache.array().length : 0) + inactiveTopics.length; // Size of list prior to update.

  // If topics is empty, delete the message and stop there.
  if (topics.length === 0 && topicsMsg) {
    removeAllTopicsRoles(client, topicsMsg);
    topicsMsg.delete();
    return;
  } else if (inactiveTopics.length > 0) { // If there is at least 1 inactiveTopic
    removeReactionToInactiveTopics(client, topicsMsg);
  }

  // Construct the message based on the topics list.
  const str = createTopicsMsg(client);

  if (topicsMsg) {
    topicsMsg = await topicsMsg.edit(str);
  } else {
    topicsMsg = await topicsChannel.send(str);
  }

  addTopicReactions(topicsMsg, oldSize, topics.length);
}

module.exports.printSuggestions = printSuggestions;
module.exports.updateTopicMessage = updateTopicMessage;
module.exports.isTopicsMessage = isTopicsMessage;

