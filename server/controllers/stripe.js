// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
import Stripe from "stripe";
const stripe = Stripe(
  "sk_test_51Mi9XpSEW6jYGSwNzFQzu3eDM3uML7obaPg8IrFufwlF0aK52lDccHrwRX9wLai3LxN4H8PP1Fcu5pjtU21GC6mH006Eac2zyQ"
);

const YOUR_DOMAIN = "http://localhost:3000";

export const stripePayment = async (req, res) => {
  const calculateOrderAmount = (amount) => {
    // Replace this constant with a calculation of the order's amount
    // Calculate the order total on the server to prevent
    // people from directly manipulating the amount on the client
    return amount;
  };

  const { postId, amount } = req.body.data;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(amount),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

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
