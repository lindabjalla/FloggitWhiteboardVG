var whiteboardModel = require('../models/whiteboard');

module.exports = function(socket){
  var whiteboards = whiteboardModel.getAll();
  socket.emit('whiteboard-update', whiteboards);

  whiteboardModel.on('updated', function updateWhiteboard(whiteboards){
    socket.emit('whiteboard-update', whiteboards);
  });
};
