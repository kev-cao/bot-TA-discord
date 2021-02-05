// queue.js
class Queue {
  constructor(name) {
    this.name = name;
    this.queue = [];
    this.locked = false;
  }

  peek() {
    // Build string from queue.
    let str = `${this.locked ? "**LOCKED**\n" : ""}There are currently ${this.queue.length} members in the queue \"${this.name}\".\n`;

    if (this.queue.length !== 0) {
      str += "__**Next Five in Line**__\n";

      // Get first five members in queue.
      for (let i = 0; i < Math.min(5, this.queue.length); i++) {
        str += `${i + 1}. ${this.queue[i].displayName}\n`;
      }
    }

    str = str.slice(0, str.length - 1); // Remove last newline character.
    return str;
  }

  enqueue(user) {
    this.queue.push(user);
  }

  dequeue() {
    return this.queue.shift();
  }

  length() {
    return this.queue.length;
  }

  indexOf(user) {
    let index;
    for (index = 0; index < this.queue.length; index++) {
      if (user === this.queue[index]) {
        break;
      }
    }

    return index == this.queue.length ? -1 : index;
  }

  toggleLock() {
    this.locked = !this.locked;
  }

  removeUser(user) {
    let index = this.indexOf(user);

    if (index !== -1) {
      this.queue.splice(index, 1);
    }

    return index;
  }
}

module.exports.Queue = Queue;