var whiteboards = [];
var events = require('events');
var eventEmitter = new events.EventEmitter();

function generateId() {
  return +(new Date());
}

function updateWhiteboard() {
  eventEmitter.emit('updated', whiteboards);
}

module.exports.addOrUpdate = function (whiteboard) {
  if (whiteboard.id === -1) {
    whiteboard.id = generateId();
  } else {
    whiteboards = whiteboards.filter(function (aWhiteboard) {
      return aWhiteboard.id !== whiteboard.id;
    });
  }
  whiteboards.push(whiteboard);
  updateWhiteboard();
  return whiteboard;
};

module.exports.getAll = function () {
  return whiteboards;
};

module.exports.get = function (id) {
  id = parseInt(id);
  return whiteboards.filter(function (item) {
    return item.id === id;
  });
};

module.exports.delete = function (id) {

  id = parseInt(id);
  var deletedItem = whiteboards.filter(function (item) {
    return item.id === id;
  });
  whiteboards = whiteboards.filter(function (item) {
    return item.id !== id;
  });
  return deletedItem;
};

module.exports.on = function (name, func) {
  eventEmitter.on(name, func);
};

module.exports.removeListener = function (name, func) {
  eventEmitter.removeListener(name, func);
};
