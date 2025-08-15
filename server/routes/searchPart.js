const express = require('express');
const router = express.Router();
const { 
  searchPart, 
} = require('../controllers/searchPart');

router.post('/', searchPart);

module.exports = router;
