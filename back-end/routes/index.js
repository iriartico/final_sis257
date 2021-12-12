var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // console.log(process.env.DB_USER); 
  res.send('Hola Mundo GET');
});

router.post('/', function(req, res) {
  // console.log(process.env.DB_USER); 
  res.send('Hola Mundo POST');
});

module.exports = router;
