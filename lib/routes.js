const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
  console.log('Page opened!');
  next();
});

router.get('/', (req, res) => {
  res.render('index.ejs');
});

module.exports = router;