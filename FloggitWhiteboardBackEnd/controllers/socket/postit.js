var postItModel = require('../model/postIt');

module.exports = function (socket) {
  var postIts = postItModel.getAll();
  socket.emit('post-it-updated', postIts);

  postItModel.on('updated', function updatePostIts(postIts) {
    socket.emit('post-it-updated', postIts);
  });
};
