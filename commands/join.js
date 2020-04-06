// join.js
// Adds the messenger to the queue if they do not exist already.
module.exports.run = (client, message, args) => {
    // User must have also provided a name.
    if (args.length <= 0) {
	message.reply(`please provide your name when joining the queue (\"${client.config.prefix}join *Name*\").`);
	return;
    }
    
    const author = message.member;
    const queue = client.queue;
    const name = args.join(" ");
    
    // Check to see if the user has already joined the queue.
    if (queue.some(entry => entry.user == author)) {
	message.reply(`you are already in the queue! To leave the queue, use \"${client.config.prefix}leave\".`);
	return;
    }
    
    // Add user to queue as an entry.
    if (queue.length <= 20){
	queue.push({user: author, name: name});
	message.reply(`you have been added to the queue. You are in position ${queue.length}.`);
    }else{
	message.reply(`Sorry, our maximum queue length is 20. Please try again later.`);
    }

};


