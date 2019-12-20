const express = require('express');
const router = express.Router();

const nav = require('./nav');

router.use('/', nav);

module.exports = router;
