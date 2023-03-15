import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
// import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51Mi9XpSEW6jYGSwN7MoEttMHypPLrh4GVb1XxbDlzPSd2eVV1tZ3PiznwOdTCr80OyFl7AhVrgg6av9irrN7opr300DWmjbRZH");

export default function Stripe({postId, amount}) {
  const data = {
    postId,amount
  }
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:3001/posts/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({data}),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret)
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm postId={postId} amount={amount} />
        </Elements>
      )}
    </div>
  );
}