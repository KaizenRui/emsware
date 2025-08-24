const express = require("express");
const router = express.Router();
const { queryBOM } = require("../../controllers/billofmaterials/queryBOM");

router.get("/", queryBOM);

module.exports = router;
