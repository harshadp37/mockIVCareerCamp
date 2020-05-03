const express = require('express');
const router = express.Router();
const downloadController = require('./../controllers/download');

// ADD NEW INTERVIEW
router.get('/', downloadController.getDownloadPage);
router.get('/data', downloadController.getData);

module.exports = router;