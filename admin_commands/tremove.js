// tremove.js
// Clears topic at input index.
module.exports.description = "Clears topic at the index given."

const topic0p = require("../lib/topic.js");

module.exports.run = (client, message, args) => {
	const channel = message.channel;

	// Get the index of topic we want removed
	indexToClear = parseInt(args);
	currentTopics = client.topics;
	let returnMessage = "";

	if (isNaN(indexToClear)) {
		returnMessage = "Please enter a proper integer.";
	} else if (indexToClear >= currentTopics.length) {
		returnMessage = "Index given exceeds the length of current list of topics.";
	} else {
		currentTopics[indexToClear] = false;
		client.topics = currentTopics;
		returnMessage = `Topic at index ${ indexToClear } is now inactive.`;
	}

	channel.send(returnMessage);
	topic0p.updateTopicMessage(client, message.guild);
}

