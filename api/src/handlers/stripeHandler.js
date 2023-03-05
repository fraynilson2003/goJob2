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

const eventListenComplete = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let paymentIntent 

  console.log(sig)
  try {

    // const event = stripe.webhooks.constructEvent(
    //   req.rawBody,
    //   sig,
    //   "whsec_52f726ff93740cdc21dbd6dc20cd4b447eacc690ed34109ce4372b15f8ff44ec"
    // );

    
    // if (event.type === "checkout.session.completed") {
    //   // Actualiza el pedido en tu base de datos y redirige al usuario a successUrl
    //   const session = event.data.object;
    //    paymentIntent = await stripe.paymentIntents.retrieve(
    //     session.payment_intent
    //   );
      
      // Verifica que el pago fue exitoso antes de actualizar el estado del pedido
      // if (paymentIntent.status === "succeeded") {
      //   // Actualiza el estado del pedido en tu base de datos
      //   console.log("funciona")
      //   // y redirige al usuario a la página de éxito
      //   res.redirect("https://localhost:3001");
      // } else {
      //   // Si el pago no fue exitoso, no actualices el estado del pedido
      //   // y devuelve una respuesta exitosa al webhook de Stripe
      //   res.sendStatus(200);
      // }
  
    // }
  } catch (err) {
    console.log(paymentIntent);
    // res.sendStatus();
    res.status(408).json({error:err.message})
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
