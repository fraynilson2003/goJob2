const { Router, raw } = require('express');
const bodyParser = require('body-parser');
const rawBodyParser = require('raw-body-parser');
const router = Router();
const {createCheckoutHandler, 
        productCreateHandler, 
        priceCreatedHandler,
        productByIdHandler,
        delProductHandler,
        allProductHandler,
        allPriceProductHandler,
        eventListenComplete} = require("../handlers/stripeHandler")


//estas rutas solo son para ver como funciona el api, las rutas funcionales vienen dentro de createservice y createjob


router.post("/checkout", createCheckoutHandler) // creas un checkout

router.post("/createproduct", productCreateHandler) // creas un product enviando un nombre

router.post("/createprice", priceCreatedHandler)//creas un precio enviando un ID de producto

router.get("/search/:idproduct",productByIdHandler)//obtiene informacion de un producto determinado

router.delete("/delproducto/:idproduct",delProductHandler)//borrar producto por ID

router.get("/allProducts",allProductHandler)//muestra todos los productos en un array de objetos

router.get("/allPrices/:idproduct",allPriceProductHandler)//muestra todos los precios de un producto

// server.js
//
// Use this sample code to handle webhook events in your integration.
//
// 1) Paste this code into a new file (server.js)
//
// 2) Install dependencies
//   npm install stripe
//   npm install express
//
// 3) Run the server on http://localhost:4242
//   node server.js

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.



// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_52f726ff93740cdc21dbd6dc20cd4b447eacc690ed34109ce4372b15f8ff44ec";

router.post('/webhook', raw({type: 'application/json'}), async (request, response) => {
  const sig = request.headers['stripe-signature'];

     
  let event;

  try {
    event = await stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    console.log(event)
    response.status(200).json({event})
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
    console.log(paymentIntentSucceeded) 
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});






module.exports = router;