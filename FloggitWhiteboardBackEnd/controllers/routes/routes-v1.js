var express = require('express');
var postitModel = require('../models/postit');
var whiteboardModel = require('../models/whiteboard');

var router = express.Router();

// get a postit (accessed at GET http://localhost:8080/api/v1/postits)
router.get('/postits', function (req, res) {
  res.json(postitModel.getAll());
});

// create a postit (accessed at POST http://localhost:8080/api/v1/postits)
router.route('/postits')
  .post(function (req, res) {
    var newpostit = req.body;
    var postItToReturn = postitModel.addOrUpdate(newpostit);
    res.json(postItToReturn);
  });

// get the postit with id (accessed at PUT http://localhost:8080/api/v1/postits/:id)
router.route('/postits/:id')
  .get(function (req, res) {
    var postitItem = postitModel.get(req.params.id);
    if (postitItem) {
      res.json(postitModel.get(req.params.id));
    } else {
      res.status(404);
      res.send();
    }
  })
  // delete the postit with id (accessed at DELETE http://localhost:8080/api/v1/postits/:id)
  .delete(function (req, res) {
    postitModel.delete(req.params.id);
    res.status(200);
    res.json({
      message: 'Successfully deleted'
    });
    // res.send();
  })
  // updatePostIt the postit with id (accessed at PUT http://localhost:8080/api/v1/postits/:id)
  .put(function (req, res) {
    var updatePostit = req.body;
    var id = req.params.id;
    id = parseInt(id);
    if (postitModel.get(id)) {
      postitModel.delete(id);
      postitModel.addOrUpdate(updatePostit);
      res.status(200);
      res.send();
    } else {
      postitModel.addOrUpdate(updatePostit);
      res.status(201);
      res.json(updatePostit);
      res.send();
    }
  });

router.get('/whiteboards', function (req, res) {
  res.json(whiteboardModel.getAll());
});

router.route('/whiteboards')
  .post(function (req, res) {
    var newWhiteboard = req.body;
    var whiteboardToReturn = whiteboardModel.addOrUpdate(newWhiteboard);
    res.json(whiteboardToReturn);
  });

router.route('/whiteboards/:id')
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
    postitModel.addOrUpdate(updateWhiteboard);
    res.status(201);
    res.json(updateWhiteboard);
    res.send();
  }
});

module.exports = router;
