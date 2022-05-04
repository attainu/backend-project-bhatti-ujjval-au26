"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _data = _interopRequireDefault(require("./data"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _orderRouter = _interopRequireDefault(require("./routers/orderRouter"));

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */

/* eslint-disable quotes */

/* eslint-disable linebreak-style */

/* eslint-disable no-console */
_mongoose.default.connect("mongodb+srv://ujjval:12345@cluster0.o3jqs.mongodb.net/Zometo?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB...")).catch(error => console.log("Could not connect to MongoDB..."));

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use(_bodyParser.default.json());
app.use('/api/users', _userRouter.default);
app.use('/api/orders', _orderRouter.default);
app.get('/api/paypal/clientId', (req, res) => {
  res.send({
    clientId: _config.default.PAYPAL_CLIENT_ID
  });
});
app.get("/api/products", (req, res) => {
  res.send(_data.default.products);
});
app.get("/api/products/:id", (req, res) => {
  const product = _data.default.products.find(p => p._id === req.params.id);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({
      message: "Product not found"
    });
  }
});
app.use((err, req, res, next) => {
  const status = err.name && err.name === "ValidationError" ? 400 : 500;
  res.status(status).send({
    message: err.message
  });
});
app.listen(5000, () => {
  console.log("Server started on port 5000");
});