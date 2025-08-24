const express = require('express');
const router = express.Router();
const { searchBOM } = require('../../controllers/billofmaterials/searchBOM');

router.get('/', searchBOM);

module.exports = router;
