// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
import Stripe from 'stripe';
const stripe = Stripe('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');

const YOUR_DOMAIN = 'http://localhost:3000';

export const stripePayment = async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: '{{PRICE_ID}}',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      });
    
      res.redirect(303, session.url);
}





// const stripe = require("stripe")('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');

// const calculateOrderAmount = (items) => {
//     // Replace this constant with a calculation of the order's amount
//     // Calculate the order total on the server to prevent
//     // people from directly manipulating the amount on the client
//     return 1400;
//   };

//   export const stripePayment = async (req, res) => {
//     const { items } = req.body;
  
//     // Create a PaymentIntent with the order amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: calculateOrderAmount(items),
//       currency: "usd",
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });
  
//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   }