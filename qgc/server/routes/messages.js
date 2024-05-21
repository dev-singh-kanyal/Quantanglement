import express from "express";
import { getMessages, addMessage, deleteMessage } from "../controllers/message.js";

const router = express.Router();

router.get("/", getMessages);
router.post("/", addMessage);
router.delete("/:id", deleteMessage);

export default router;
