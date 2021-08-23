// tremove.js
// Clears topic at input index.
module.exports.description = "Clears topic at the index given."

const topic0p = require("../lib/topic.js");

module.exports.run = (client, message, args) => {
	const channel = message.channel;

	inactiveIndexes = args.split(/\|/g);
	inactiveIndexes = inactiveIndexes.map(s => parseInt(s.trim()));

	// Get the index of topic we want removed
	currentTopics = client.topics;
	let returnMessage = "";

	try {
		inactiveIndexes.forEach(ind => {
			currentTopics[ind][1] = false;
			returnMessage = `Topic at index(es) ${ inactiveIndexes } are now inactive.`;
			client.topics = currentTopics;
		});
	} catch (err) {
		returnMessage = `Please give a proper value`;
	}

	channel.send(returnMessage);
	topic0p.updateTopicMessage(client, message.guild);
}

