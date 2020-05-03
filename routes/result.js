const express = require('express');
const router = express.Router();
const resultController = require('./../controllers/result');

// ADD NEW INTERVIEW
router.post('/markStatus', resultController.addResultStatus);
router.put('/markStatus', resultController.updateResultStatus);

module.exports = router;