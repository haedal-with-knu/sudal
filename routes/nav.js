const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
  res.render('intro.ejs');
});

module.exports = router;
