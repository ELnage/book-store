import express from "express"
import {db_connection} from "./DB/connection.js";
import bookRouter from "./src/modules/book/book.router.js"
import authorRouter from "./src/modules/author/author.router.js";

const app = express()

app.use(express.json())
app.use("/book" , bookRouter)
app.use("/author", authorRouter);

app.use("/" , (req , res)=>{
  res.send("welcome")
})
db_connection()
app.listen(3000 , ()=> console.log("server is running on 3000"))