import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")("sk_test_51Pr8CxHlirJCHboKHw939YIAxgOS1pH1dJ7OTdS2edvYE27HnNV21nR9oNvogw5rY5GMRH6yRtfgSLJy0HHjUBQ800I2rurMwc");

export async function POST(request) {
  try {
    const { amount } = await request.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);
    // Handle other errors (e.g., network issues, parsing errors)
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
