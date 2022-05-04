"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _OrderModel = _interopRequireDefault(require("../models/OrderModel"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const orderRouter = _express.default.Router();

orderRouter.get("/mine", _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const orders = await _OrderModel.default.find({
    user: req.user._id
  });
  res.send(orders);
}));
orderRouter.get("/:id", _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = await _OrderModel.default.findById(req.params.id);

  if (order) {
    res.json(order);
  } else {
    res.status(404).json({
      message: "Order not found"
    });
  }
}));
orderRouter.post("/", _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = new _OrderModel.default({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice
  });
  const createdOrder = await order.save();
  res.status(201).send({
    message: "Order created successfully",
    order: createdOrder
  });
}));
orderRouter.put("/:id/pay", _utils.isAuth, (0, _expressAsyncHandler.default)(async (req, res) => {
  const order = await _OrderModel.default.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = new Date();
    order.payment.paymentResult = {
      orderId: req.body.orderId,
      payerId: req.body.payerId,
      paymentId: req.body.paymentId
    };
    const updatedOrder = await order.save();
    res.status(200).send({
      message: "Order paid successfully",
      order: updatedOrder
    });
  } else {
    res.status(404).send({
      message: "Order not found"
    });
  }
}));
var _default = orderRouter;
exports.default = _default;