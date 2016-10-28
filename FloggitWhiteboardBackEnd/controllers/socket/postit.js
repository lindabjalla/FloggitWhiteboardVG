var postitModel = require('../models/postit');

module.exports = function(socket){
  var postIts = postitModel.getAll();
  socket.emit('postit-updated', postIts);

  postitModel.on('updated', function updatePostits(postIts){
    socket.emit('postit-updated', postIts);
  });
};
