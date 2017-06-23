var express = require('express');
var postItModel = require('../model/postIt');
var whiteboardModel = require('../model/whiteboard');

var router = express.Router();

// get a post-it (accessed at GET http://localhost:8081/api/v1/post-it)
router.get('/post-it', function (req, res) {
  res.json(postItModel.getAll());
});

// create a post-it (accessed at POST http://localhost:8081/api/v1/post-it)
router.route('/post-it')
  .post(function (req, res) {
    var newPostIt = req.body;
    var postItToReturn = postItModel.addOrUpdate(newPostIt);
    res.json(postItToReturn);
  });

// get the post-it with id (accessed at PUT http://localhost:8081/api/v1/post-it/:id)
router.route('/post-it/:id')
  .get(function (req, res) {
    var postItItem = postItModel.get(req.params.id);
    if (postItItem) {
      res.json(postItModel.get(req.params.id));
    } else {
      res.status(404);
    }
  })
  // delete the post-it with id (accessed at DELETE http://localhost:8081/api/v1/post-it/:id)
  .delete(function (req, res) {
    postItModel.delete(req.params.id);
    res.status(200);
    res.json({
      message: 'Successfully deleted'
    });
  })

  // updatePostIt the post-it with id (accessed at PUT http://localhost:8081/api/v1/post-it/:id)
  .put(function (req, res) {
    var postItToUpdate = req.body;
    var id = req.params.id;
    id = parseInt(id);
    if (postItModel.get(id)) {
      postItModel.delete(id);
      postItModel.addOrUpdate(postItToUpdate);
      res.status(200);
    } else {
      postItModel.addOrUpdate(postItToUpdate);
      res.status(201);
      res.json(postItToUpdate);
    }
  });

router.get('/whiteboard', function (req, res) {
  res.json(whiteboardModel.getAll());
});

router.route('/whiteboard')
  .post(function (req, res) {
    console.log(req);
    var newWhiteboard = req.body;
    var whiteboardToReturn = whiteboardModel.addOrUpdate(newWhiteboard);
    res.json(whiteboardToReturn);
  });

router.route('/whiteboard/:id')
  .put(function (req, res) {
    var updateWhiteboard = req.body;
    var id = req.params.id;
    id = parseInt(id);
    if (whiteboardModel.get(id)) {
      whiteboardModel.delete(id);
      whiteboardModel.addOrUpdate(updateWhiteboard);
      res.status(200);
      res.send();
    } else {
      postItModel.addOrUpdate(updateWhiteboard);
      res.status(201);
      res.json(updateWhiteboard);
      res.send();
    }
  });

module.exports = router;
