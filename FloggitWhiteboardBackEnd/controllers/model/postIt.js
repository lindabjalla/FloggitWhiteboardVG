var postIts = [];
var events = require('events');
var eventEmitter = new events.EventEmitter();
eventEmitter.setMaxListeners(0);

function generateId() {
  return +(new Date());
}

function updateAllPostIts() {
  eventEmitter.emit('updated', postIts);
}

module.exports.getAll = function () {
  return postIts;
};

module.exports.addOrUpdate = function (item) {
  var timeCreated;
  var postIt;
  if (item.id === -1) {
    timeCreated = new Date();
    item.timeCreated = timeCreated.toLocaleString();
    item.id = generateId();
  } else {
    postIts = postIts.filter(function (postIt) {
      return postIt.id !== item.id;
    });
  }
  postIt = {
    id: item.id,
    title: item.title,
    text: item.text,
    timeCreated: item.timeCreated,
    color: item.color,
    notes: item.notes,
    whiteboardId: item.whiteboardId
  };
  postIts.push(postIt);
  updateAllPostIts();
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
  updateAllPostIts();
  return deletedItem;
};

module.exports.on = function (name, func) {
  eventEmitter.on(name, func);
};

module.exports.removeListener = function (name, func) {
  eventEmitter.removeListener(name, func);
};
