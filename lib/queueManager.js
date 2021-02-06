const Queue = require("./queue.js").Queue;

class QueueManager {
    constructor() {
        this.queues = [];
        this.userMap = {};
    }

    enqueueUser(queueIdx, user) {
        try {
            if (user in this.userMap) {
                return `you are already in queue \"${this.userMap[user].name}\".`;
            }
            const queue = this.queues[queueIdx];
            if (!queue.locked) {
                queue.enqueue(user);
                this.userMap[user] = queue;
                return `you have been added to the queue \"${queue.name}\". You are in position ${queue.length()}.`;
            } else {
                return `queue \"${queue.name}\" is locked.`;
            }
        } catch (err) {
            return "invalid queue index.";
        }
    }

    removeUsers(users) {
        users.forEach(user => {
            if (user in this.userMap) {
                this.userMap[user].removeUser(user);
                delete this.userMap[user];
            }
        });

        return `Specified users removed from their queues.`;
    }

    clearQueue(queueIdx) {
        try {
            this.queues[queueIdx].queue = [];
            return `Queue \"${this.queues[queueIdx].name} was cleared.`;
        } catch (err) {
            return "Invalid queue index.";
        }
    }

    leaveQueue(user) {
        if (user in this.userMap) {
            const queue = this.userMap[user];
            this.removeUsers([user]);
            delete this.userMap[user];
            return `you have been removed from queue \"${queue.name}\".`
        }

        return "you are not in a queue. No changes were made.";
    }

    userPosition(user) {
        if (user in this.userMap) {
            const queue = this.userMap[user];
            const index = queue.indexOf(user);
            return `you are in position ${index + 1} of queue \"${queue.name}\".`;
        }

        return "you are not in a queue.";
    }

    peekQueue(queueIdx) {
        try {
            return this.queues[queueIdx].peek()
        } catch (err) {
            return "Invalid queue index.";
        }
    }

    displayQueues() {
        let str = "__**Queues**__\n";
        for (let i = 0; i < this.queues.length; i++) {
            let q = `${this.queues[i].name}`;

            if (this.queues[i].locked) {
                q = "~~" + q + "~~";
            }

            str += `${i}. ${q}\n`;
        }

        str = str.slice(0, str.length - 1); // Remove last newline character.
        return str;
    }

    dequeue(queueIdx) {
        try {
            const queue = this.queues[queueIdx];
            const user = queue.dequeue();
            if (user) {
                delete this.userMap[user];
                return `May the following user come forth:\n**User:** ${user.toString()}`;
            } else {
                return `Queue \"${queue.name}\" is empty.`;
            }
        } catch (err) {
            return `Invalid queue index.`;
        }
    }

    contains(queueName) {
        let index;
        for (index = 0; index < this.queues.length; index++) {
            if (this.queues[index].name.toLowerCase() === queueName.toLowerCase()) {
                return true;
            }
        }

        return false;
    }

    createQueue(queueName) {
        if (!this.contains(queueName)) {
            this.queues.push(new Queue(queueName));
            return `Queue \"${queueName}\" was created.`;
        }

        return "A queue under that name already exists.";
    }

    closeQueue(queueIdx) {
        if (queueIdx >= 0 && queueIdx < this.queues.length) {
            const queue = this.queues[queueIdx];
            this.queues.splice(queueIdx, 1);
            queue.queue.forEach(user => delete this.userMap[user]);
            return `Queue \"${queue.name}\" was removed.`;
        }
        return "Invalid queue index.";
    }

    closeAllQueues() {
        this.queues = [];
        this.userMap = {};
        return "All queues have been closed.";
    }

    toggleLockQueue(queueIdx) {
        try {
            const queue = this.queues[queueIdx];
            queue.toggleLock();
            return `Queue \"${queue.name}\" has been ${queue.locked ? "locked" : "unlocked"}.`;
        } catch (err) {
            return "Invalid queue index.";
        }
    }
}

module.exports.QueueManager = QueueManager;