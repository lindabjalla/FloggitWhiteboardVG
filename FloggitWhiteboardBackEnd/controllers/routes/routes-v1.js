var express = require('express');
var postitModel = require('../models/postit');

var router = express.Router();

// get a postit (accessed at GET http://localhost:8080/api/v1/postits)
router.get('/postits', function(req, res) {
  res.json(postitModel.getAll());
});

// create a postit (accessed at POST http://localhost:8080/api/v1/postits)
router.route('/postits')
  .post(function(req, res) {
    var newpostit = req.body;
    var id = postitModel.addOrUpdate(newpostit);
    res.json({
      id: id
    });
  });

// get the postit with id (accessed at PUT http://localhost:8080/api/v1/postits/:id)
router.route('/postits/:id')
  .get(function(req, res) {
    var postitItem = postitModel.get(req.params.id);
    if (postitItem) {
      res.json(postitModel.get(req.params.id));
    } else {
      res.status(404);
      res.send();
    }
  })
  // delete the postit with id (accessed at DELETE http://localhost:8080/api/v1/postits/:id)
  .delete(function(req, res) {
    postitModel.delete(req.params.id);
    res.status(200);
    res.json({
      message: 'Successfully deleted'
    });
    // res.send();
  })
  // update the postit with id (accessed at PUT http://localhost:8080/api/v1/postits/:id)
  .put(function(req, res) {
    var updatePostit = req.body;
      var id = req.params.id;
      id = parseInt(id);
      if (postitModel.get(id)) {
        postitModel.delete(id);
        postitModel.addOrUpdate(id, updatePostit);
        res.status(200);
        res.send();
      } else {
        postitModel.addOrUpdate(id, updatePostit);
        res.status(201);
        res.json({
          id: id
        });
        res.send();
      }
  });

  module.exports = router;
