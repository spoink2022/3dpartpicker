const { getAllParts } = require('./global.js');
const { getUser } = require('./getter/accounts.js');
const { getPart } = require('./getter/get_part.js');

const express = require('express')
const router = express.Router()

//router.use((req, res, next) => {
//  next();
//});

router.get('/', async (req, res) => {
  let parts = await getAllParts();
  let user = await getUser(req.query.user);
  let avatarUrl = (user && user.avatar_url) ? user.avatar_url : 'https://storage.googleapis.com/3dpartpicker-files/users/default.png';
  res.render('index.ejs', { parts: parts, avatarUrl: avatarUrl });
});

router.get('/product', async (req, res) => {
  let part = await getPart(req.query.id);
  let user = await getUser(req.query.user);
  let avatarUrl = (user && user.avatar_url) ? user.avatar_url : 'https://storage.googleapis.com/3dpartpicker-files/users/default.png';
  let fullName = user ? user.first_name + ' ' + user.last_name : 'Login';
  res.render('product.ejs', { part: part, avatarUrl: avatarUrl, fullName: fullName });
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