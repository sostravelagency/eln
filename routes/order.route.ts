// server/routes/order.route.ts
import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  createOrder,
  createOrderApp,
  getAllOrders,
  newPayment,
  newPaymentApp,
  sendStripePublishableKey,
} from "../controllers/order.controller";
const orderRouter = express.Router();

orderRouter.post("/create-order", isAutheticated, createOrder);
orderRouter.post("/create-order-app", isAutheticated, createOrderApp);

orderRouter.get(
  "/get-orders",
  isAutheticated,
  authorizeRoles("admin"),
  getAllOrders
);

orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey);

orderRouter.post("/payment", isAutheticated, newPayment);
orderRouter.post("/payment-app", isAutheticated, newPaymentApp);

export default orderRouter;
