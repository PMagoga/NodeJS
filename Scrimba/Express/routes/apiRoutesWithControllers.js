import express from "express";

import { productsController } from "../controllers/productsController.js";
import { servicesController } from "../controllers/servicesController.js";

export const apiRouter = express.Router();

apiRouter.get("/products", productsController);

apiRouter.get("/services", servicesController);
// somente usado para exemplo do uso de controllers
