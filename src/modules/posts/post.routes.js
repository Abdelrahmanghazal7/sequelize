import { Router } from "express";
import * as posts from "./post.controller.js";

const router = Router();

router.post("/", posts.addPost);

router.get("/", posts.getPosts);

router.get("/:postId", posts.getPostWithAuthor);

router.patch("/", posts.updatePost);

router.delete("/:id", posts.deletePost);

export default router;
