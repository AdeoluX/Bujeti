const express = require('express');
const {
  UrbanServiceController,
} = require('../controller/urbanarea.controller');
const router = express.Router();

router.get('/urban-areas', UrbanServiceController.listAllUrbanAreas);
router.get('/urban-area', UrbanServiceController.getDetailsOfUrbanArea);

module.exports = router;
