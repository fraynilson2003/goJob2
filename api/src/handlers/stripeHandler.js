// require('dotenv').config();
const stripe = require("stripe")("sk_test_AAyUlMphrjfBjDBQMINfJPbZ00fxbQSK3d");
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
  webHook
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

const webHookHandler = async (request, response) => {
  const sig = request.headers['stripe-signature'];
  const payload = request.body;
  const endpointSecret = "whsec_52f726ff93740cdc21dbd6dc20cd4b447eacc690ed34109ce4372b15f8ff44ec";

  let event;

  try {
    event = webHook(payload, sig, endpointSecret);
  } catch (error) {
    console.log(error.message)
    response.status(400).json({success:false});
    return;
  }

  console.log(event.type)
  console.log(event.data.object)
  // console.log(event.object.id)

  response.status(200).json({success:true});
    
};

module.exports = {
  productByIdHandler,
  createCheckoutHandler,
  productCreateHandler,
  priceCreatedHandler,
  delProductHandler,
  allProductHandler,
  allPriceProductHandler,
  webHookHandler
};
