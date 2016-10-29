var whiteboardModel = require('../models/whiteboard');

module.exports = function (socket) {
  var whiteboards = whiteboardModel.getAll();
  socket.emit('whiteboard-updated', whiteboards);

  whiteboardModel.on('updated', function updateWhiteboards(whiteboards) {
    socket.emit('whiteboard-updated', whiteboards);
  });
};
