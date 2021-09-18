const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
  console.log('Page opened!');
  next();
});

router.get('/', (req, res) => {
  res.render('index.ejs');
});

router.get('/product', (req, res) => {
  res.render('product.ejs');
});

router.get('/print', (req, res) => {
  res.render('print.ejs');
});

router.get('/checkout', (req, res) => {
  console.log('CHECKED OUT');
  res.redirect('/success');
});

router.get('/success', (req, res) => {
  res.render('success.ejs');
});

module.exports = router;