const stripe = require('stripe')('sk_test_51Mi9XpSEW6jYGSwNzFQzu3eDM3uML7obaPg8IrFufwlF0aK52lDccHrwRX9wLai3LxN4H8PP1Fcu5pjtU21GC6mH006Eac2zyQ');
const express = require('express');
const app = express();
app.use(express.static('.'));
 
const YOUR_DOMAIN = 'http://localhost:3000/checkout';
 
app.post('/create-checkout-session', async (req, res) => {
 const session = await stripe.checkout.sessions.create({
   payment_method_types: [
     'card'
   ],
   line_items: [
     {
       price: 'price_*************',
       quantity: 1,
     },
   ],
   mode: 'payment',
   success_url: `${YOUR_DOMAIN}?success=true`,
   cancel_url: `${YOUR_DOMAIN}?canceled=true`,
 });
 
 res.redirect(303, session.url)
});