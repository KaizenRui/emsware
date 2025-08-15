const express = require('express');
const router = express.Router();
const { uploadBom } = require('../controllers/uploadBom');
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('file'), uploadBom);

module.exports = router;
