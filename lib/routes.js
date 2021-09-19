const { getAllParts } = require('./global.js');
const { getUser, getNearbySellers, getSeller } = require('./getter/accounts.js');
const { getPart } = require('./getter/get_part.js');
const { createCheckoutSession } = require('./stripe.js');


const express = require('express');
const router = express.Router();

//router.use((req, res, next) => {
//  next();
//});

router.get('/', async (req, res) => {
  let parts = await getAllParts();
  // logged in
  let user = await getUser(req.query.user) || false;
  let avatarUrl = (user && user.avatar_url) ? user.avatar_url : 'https://storage.googleapis.com/3dpartpicker-files/users/default.png';

  res.render('index.ejs', { parts: parts, user: user, avatarUrl: avatarUrl });
});

router.get('/product', async (req, res) => {
  let part = await getPart(req.query.id);
  // logged in
  let user = await getUser(req.query.user) || false;
  let avatarUrl = (user && user.avatar_url) ? user.avatar_url : 'https://storage.googleapis.com/3dpartpicker-files/users/default.png';
  res.render('product.ejs', { part: part, user: user, avatarUrl: avatarUrl });
});

router.get('/print', async (req, res) => {
  let part = await getPart(req.query.product) || false;
  if (part) {
    part.qt = req.query.qt;
  }
  let user = await getUser(req.query.user) || false;
  let avatarUrl = (user && user.avatar_url) ? user.avatar_url : 'https://storage.googleapis.com/3dpartpicker-files/users/default.png';
  let sellers = user ? await getNearbySellers(user.lat, user.lon, 10) : false;
  if (req.query.lat) {
    req.query.lat = parseFloat(req.query.lat);
    req.query.lon = parseFloat(req.query.lon);
    // sellers will be null if this triggers
    sellers = await getNearbySellers(req.query.lat, req.query.lon);
    user = { lat: req.query.lat, lon: req.query.lon };
  }
  res.render('print.ejs', { part: part, user: user, avatarUrl: avatarUrl, sellers: sellers });
});

router.get('/checkout', (req, res) => {
  console.log('CHECKED OUT');
  res.redirect('/success');
});

router.get('/success', async (req, res) => {
  let seller = await getSeller(req.query.seller);
  res.render('success.ejs', { seller: seller });
});

router.post('/findSellers', (req, res) => {
  res.redirect(`/print?lat=${req.body.lat}&lon=${req.body.lon}`);
});

router.post('/print', async (req, res) => {
  if (req.body.qt == 0) {
    return res.redirect('/');
  }

  res.redirect(`/print?product=${req.body.part}&qt=${req.body.qt}&user=${req.body.user}`);
});

router.post('/create-checkout-session', async (req, res) => {
  if (req.body.qt == 0) {
    return res.redirect('/');
  }

  const session = await createCheckoutSession(req.body.product, req.body.qt, req.body.seller);

  res.redirect(303, session.url);
});

module.exports = router;