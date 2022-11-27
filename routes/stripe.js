const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_KEY);

// router.use(express.urlencoded({ extended: false }));
router.use(express.json());
require("dotenv").config();

router.post('/create-checkout-session', async (req, res) => {
  // console.log('req', req)
  const { cart } = req.body;
  // console.log('server cart', cart);
  const line_items = cart.map((item) => {
    return {
      price_data: {
        currency: 'CAD',
        product_data: {
          name: item.name,
          // images: [item.image1],
          // metadata: {
          //   SKU: item.sku,
          //   color: item.color
          // }
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    // line_items: [
    //   {
    //     price_data: {
    //       currency: 'usd',
    //       product_data: {
    //         name: 'T-shirt',
    //       },
    //       unit_amount: 2000,
    //     },
    //     quantity: 1,
    //   },
    // ],
    payment_method_types: ['card'],
    shipping_address_collection: { allowed_countries: ['US', 'CA'] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: 'CAD' },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 5 },
            maximum: { unit: 'business_day', value: 7 },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:3000/thankyou',
    cancel_url: 'http://localhost:3000/shoppingcart',
  });

  res.send(JSON.stringify({ url: session.url }));
});

router.get('/create-checkout-session', (req, res) => {
  res.json(req.body);
});

module.exports = router;