const express = require('express');
const router = express.Router();
const { 
  searchStock, 
} = require('../controllers/searchStock');

router.post('/', searchStock);

module.exports = router;
