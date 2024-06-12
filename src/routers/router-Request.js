import { Router } from "express";
import { routerRequest } from "../controllers/generic.controller.js";

const router = Router(); //create router instance

router.route("/:type/:speed").get(routerRequest); //generic dynamic routes for any type or speed

export default router;
