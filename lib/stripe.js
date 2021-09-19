const config = require('../private/config.json');
const stripe = require('stripe')(config.stripeKey);

const { getPart } = require('./getter/get_part.js');

async function createCheckoutSession(id, qt, user) {
    let part = await getPart(id);

    const product = await stripe.products.create({
        name: part.name,
        images: part.images
    });

    const price = await stripe.prices.create({
        unit_amount: part.price_20,
        currency: 'cad',
        product: product.id
    });

  
    const session = await stripe.checkout.sessions.create({
      line_items: [
          { price: price.id, quantity: qt }
      ],
      payment_method_types: [
        'card'
      ],
      mode: 'payment',
      success_url: `${config.domain}/success?product=${id}&qt=${qt}&user=${user}`,
      cancel_url: `${config.domain}/`
    });

    return session;
}

module.exports = {
    createCheckoutSession: createCheckoutSession
};