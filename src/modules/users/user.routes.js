import { Router } from "express";
import * as users from "./user.controller.js";

const router = Router();

router.post("/", users.registration);

router.get("/", users.login);

router.delete("/", users.logOut);

router.get("/:id", users.getUserPostWithComments);

export default router;
