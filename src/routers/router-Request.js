import { Router } from "express";
import routerRequest from "../controllers/generic.controller.js";

const router = Router();

router.route("/:type/:speed").get(routerRequest);

export default router;
