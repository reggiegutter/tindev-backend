const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

const routes = express.Router();

routes.get('/', (req, res) => {
  res.json({ message: 'Hello World in JSON' });
});

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);
routes.post('/devs/:divId/like', LikeController.store);
routes.post('/devs/:divId/dislike', DislikeController.store);

module.exports = routes;
