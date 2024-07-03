import { Router } from "express";

import * as bookController from "./book.controller.js"
const router = Router()

router.post("/add", bookController.createBook);

router.get("/all", bookController.getAllBooks);

router.get("/:id", bookController.getBook);

router.put("/update/:id", bookController.updateBook);

router.delete("/delete/:id", bookController.deleteBook);

export default router