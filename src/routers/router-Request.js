import { Router } from "express";
import {
  handleRequestQueue,
  routerRequest,
} from "../controllers/generic.controller.js";

const router = Router(); //create router instance

router.route("/:type/:speed").get(routerRequest); //generic dynamic routes for any type or speed
router.route("/queues").post(handleRequestQueue); //route for handling queues manager

export default router;
