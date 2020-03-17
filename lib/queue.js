const indexOf = (queue, user) => {
  let index;

  for (index = 0; index < queue.length; index++) {
    if (user == queue[index].user) {
      break;
    }
  }

  return index == queue.length ? -1 : index;
}

const remove = (queue, user) => {
  let index = indexOf(queue, user);

  if (index !== -1) {
    queue.splice(index, 1);
    return index;
  } else {
    return -1;
  }
}


module.exports.indexOf = indexOf;
module.exports.remove = remove;
