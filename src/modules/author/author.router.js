import { Router } from "express";
import * as authorController from "./author.controller.js"
const router = Router()
router.post("/add", authorController.createAuthor);

router.get("/all", authorController.getAllAuthors);

router.get("/:id", authorController.getAuthor);

router.put("/update/:id", authorController.updateAuthor);

router.delete("/delete/:id", authorController.deleteAuthor);
export default router