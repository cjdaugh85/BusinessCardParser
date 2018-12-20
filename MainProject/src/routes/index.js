const express = require('express');
const router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('*', (req, res, next) => {
  res.sendfile('./public/index.html');
});

module.exports = router;
