import { Router } from "express";
import * as comments from "./comment.controller.js";

const router = Router();

router.post("/", comments.addComment);

router.get("/", comments.getComments);

router.patch("/", comments.updateComment);

router.delete("/:id", comments.deleteComment);

export default router;
