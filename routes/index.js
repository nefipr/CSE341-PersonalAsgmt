const professionalController = require('../controller');

const router = require('express').Router();

// GET /feed/posts
router.get('/', professionalController.getData);

// localhost:8080/professional/
module.exports = router;