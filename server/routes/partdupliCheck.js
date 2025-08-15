const express = require('express');
const router = express.Router();
const { 
  partdupliCheck, 
} = require('../controllers/partdupliCheck');

router.post('/', partdupliCheck);

module.exports = router;
