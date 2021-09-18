const { getAllParts } = require('./global.js');
const { getUser } = require('./getter/accounts.js');

const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
  next();
});

router.get('/', async (req, res) => {
  let parts = await getAllParts();
  let user = await getUser(req.query.id);
  let avatarUrl = (user && user.avatar_url) ? user.avatar_url : 'https://storage.googleapis.com/3dpartpicker-files/users/0.png';
  console.log(avatarUrl);
  res.render('index.ejs', { parts: parts, avatarUrl: avatarUrl });
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