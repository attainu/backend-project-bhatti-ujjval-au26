import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/OrderModel";
import {isAuth} from "../utils"

const orderRouter = express.Router();
orderRouter.get("/mine", isAuth, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id});
    res.send(orders);
}));



orderRouter.get("/:id", isAuth, expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.json(order);
    } else {
        res.status(404).json({ message: "Order not found" });
    }
}));
 
orderRouter.post("/",isAuth,expressAsyncHandler(async (req, res) => {
    const order = new Order ({
        orderItems: req.body.orderItems,
        user: req.user._id,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).send({message: "Order created successfully", order: createdOrder});
}));
orderRouter.put("/:id/pay",isAuth,expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id); 
    if(order){
        order.isPaid = true;
        order.paidAt = new Date();
        order.payment.paymentResult = {
            orderId: req.body.orderId,
            payerId: req.body.payerId,
            paymentId: req.body.paymentId,
        };
        const updatedOrder = await order.save();
        res.status(200).send({message: "Order paid successfully", order: updatedOrder});
    }else{
        res.status(404).send({message: "Order not found"});
    }
}));
        


export default orderRouter;