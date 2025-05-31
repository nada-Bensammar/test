const express = require('express');
const router = express.Router();
const aiController = require('../controller/aiController');

router.get('/models', aiController.listModels);
router.post('/generate', aiController.generateText);

module.exports = router;
