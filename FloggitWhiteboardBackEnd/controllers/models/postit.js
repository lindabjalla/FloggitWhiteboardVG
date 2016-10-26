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

module.exports.addOrUpdate = function (id, item) {
  var itemId;
  var timeCreated;
  if (!item) {
    timeCreated = new Date();
    item = id;
    item.timeCreated = timeCreated.toLocaleString();
    itemId = generateId();
  } else {
    itemId = id;
  }
  postIts.push({
    id: itemId,
    postIt: {
      title: item.title,
      text: item.text,
      timeCreated: item.timeCreated,
      color: item.color,
      notes: item.notes
    }
  });
  updateAllPostits();
  return itemId;
};

module.exports.get = function (id) {
  id = parseInt(id);
  var itemToReturn = postIts.filter(function (item) {
    return item.id === id;
  });
  return itemToReturn;
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
