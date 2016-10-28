var postIts = [];
var events = require('events');
var eventEmitter = new events.EventEmitter();

function generateId() {
  return +(new Date());
}

function updateAllPostits() {
  eventEmitter.emit('updated', postIts);
}

module.exports.getAll = function () {
  return postIts;
};

module.exports.addOrUpdate = function (item) {
  var itemId;
  var timeCreated;
  var postIt;
  if (item.id === -1) {
    timeCreated = new Date();
    item.timeCreated = timeCreated.toLocaleString();
    itemId = generateId();
  } else {
    postIts = postIts.filter(function (postIt) {
      return postIt.id !== item.id;
    });
  }
  postIt = {
    id: itemId,
    title: item.title,
    text: item.text,
    timeCreated: item.timeCreated,
    color: item.color,
    notes: item.notes
  };
  postIts.push(postIt);
  updateAllPostits();
  return postIt;
};

module.exports.get = function (id) {
  id = parseInt(id);
  return postIts.filter(function (item) {
    return item.id === id;
  });
};

module.exports.delete = function (id) {

  id = parseInt(id);
  var deletedItem = postIts.filter(function (item) {
    return item.id === id;
  });
  postIts = postIts.filter(function (item) {
    return item.id !== id;
  });
  updateAllPostits();
  return deletedItem;
};

module.exports.on = function (name, func) {
  eventEmitter.on(name, func);
};

module.exports.removeListener = function (name, func) {
  eventEmitter.removeListener(name, func);
};
