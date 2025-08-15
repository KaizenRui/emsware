const express = require('express');
const router = express.Router();
const { 
  addPart, 
} = require('../controllers/addPart');

router.post('/', addPart);

module.exports = router;
