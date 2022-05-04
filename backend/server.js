/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import express from "express";
import cors from "cors";
import data from "./data"; 
import mongoose from "mongoose";
import bodyParser from "body-parser"; 
import userRouter from "./routers/userRouter";
import orderRouter from "./routers/orderRouter";
import config from "./config";

mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB..."))
.catch(error => console.log("Could not connect to MongoDB..."));




const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.get('/api/paypal/clientId', (req, res) => {
  res.send({clientId: config.PAYPAL_CLIENT_ID});
});
app.get("/api/products", (req, res) => {
  res.send(data.products);
});
app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((p) => p._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});
app.use((err, req, res, next) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500;
  res.status(status).send({ message: err.message });
});
app.listen(config.PORT, () => {
  console.log("Server started on port 5000");
});
