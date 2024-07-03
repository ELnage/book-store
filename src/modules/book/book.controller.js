import Book from "../../../DB/models/book.model.js";

export const createBook =  async(req , res , next)=> {
  try {
      const { title, content, author, publishedDate } = req.body;
      const book = { title, content, author, publishedDate };
      const titleExist = await Book.findOne({ title });
      if (titleExist) {
          return res.status(409).json({ message: "book already exist" });
      } 
      const createdBook = await Book.create(book);
      res.status(201).json({ msg : "Book created successfully" , createdBook });
  } catch (error) {
    console.log("error in creating book", error);
    res.status(500).json({message : "error in creating book" , error});
  }
}

export const getAllBooks = async (req, res, next) => {
  try {
    const {limit , page , title , author} = req.query
    let query = {}
    if(title){
      query.title = {$regex : title , $options : "i"}
    }
    if(author){
      query.author = {$regex : author , $options : "i"}
    }
    const books = await Book.find(query).limit(limit).skip(limit*(page-1));
    res.status(200).json({ count : books.length, books });
  } catch (error) {
    console.log("error in getting all books", error);
    res.status(500).json({message : "error in getting all books" , error});
  }
}
export const getBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if(!book) return res.status(404).json({message : "book not found"})
    res.status(200).json({ book });
  } catch (error) {
    console.log("error in getting book", error);
    res.status(500).json({message : "error in getting book" , error});
  }
}

export const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, author, publishedDate } = req.body;
    const book = { title, content, author, publishedDate };
    const updatedBook = await Book.findByIdAndUpdate(id, {$set: book , $inc : {__v : 1}} , { new: true });
  if (!updatedBook) return res.status(404).json({ message: "book not found" });
    res.status(200).json({ msg : "Book updated successfully" , updatedBook });
  } catch (error) {
    console.log("error in updating book", error);
    res.status(500).json({message : "error in updating book" , error});
  }
}

export const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    res.status(200).json({ msg : "Book deleted successfully" , deletedBook });
  } catch (error) {
    console.log("error in deleting book", error);
    res.status(500).json({message : "error in deleting book" , error});
  }
}