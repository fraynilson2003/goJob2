const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const {
  createSession,
  createProduct,
  createPrice,
  getProductById,
  deleteProduct,
  listProducts,
  listPrices,
} = require("../services/stripe");

const createCheckoutHandler = async (req, res) => {
  try {
    const { priceId } = req.body;
    const session = await createSession(priceId);

    res.json(session);
  } catch (error) {
    res.json({ error: error });
  }
};

const productCreateHandler = async (req, res) => {
  try {
    const { name } = req.body;

    const idProduct = await createProduct(name);

    res.json(idProduct);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const productByIdHandler = async (req, res) => {
  try {
    const { idProduct } = req.body;

    const product = getProductById(idProduct);

    res.json(product);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const delProductHandler = async (req, res) => {
  try {
    const { idProduct } = req.body;

    const delProduct = await deleteProduct(idProduct);

    res.json(delProduct);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const priceCreatedHandler = async (req, res) => {
  try {
    const { idprice, price } = req.body;

    const idPrice = await createPrice(price, idprice);

    res.json(idPrice);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const allProductHandler = async (req, res) => {
  try {
    const delProduct = await listProducts();

    res.json(delProduct);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const allPriceProductHandler = async (req, res) => {
  try {
    const { producto_id } = req.params;

    const allPrices = await listPrices(producto_id);

    res.json(allPrices);
  } catch (error) {
    res.json({ error: error.message });
  }
};

const eventListenComplete = async (request, response) => {
  
  const endpointSecret = "whsec_52f726ff93740cdc21dbd6dc20cd4b447eacc690ed34109ce4372b15f8ff44ec";
 
    const sig = request.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    
};

module.exports = {
  productByIdHandler,
  createCheckoutHandler,
  productCreateHandler,
  priceCreatedHandler,
  delProductHandler,
  allProductHandler,
  allPriceProductHandler,
  eventListenComplete
};
