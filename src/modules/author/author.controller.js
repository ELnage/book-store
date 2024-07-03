import Author from "./../../../DB/models/author.model.js";
export const createAuthor = async (req, res, next) => {
  try {
    const { name, bio, birthDate, books } = req.body;
    const author = { name, bio, birthDate, books };
    const createdAuthor = await Author.create(author);
    res.status(201).json({ msg : "Author created successfully" ,  createdAuthor });
  } catch (error) {
    console.log("error in creating author", error);
    res.status(500).json({ message: "error in creating author", error });
  }
};  

export const getAllAuthors = async (req, res, next) => {
  try {
    const {limit , page , name , bio} = req.query
    let query = {}
    if(name){
      query.name = {$regex : name , $options : "i"}
    }
    if(bio){
      query.bio = {$regex : bio , $options : "i"}
    }
    const authors = await Author.find(query).populate([{path : "books"}]).limit(limit).skip(limit*(page-1));
    res.status(200).json({ count : authors.length, authors });
  } catch (error) {
    console.log("error in getting all authors", error);
    res.status(500).json({ message: "error in getting all authors", error });
  }
};

export const getAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id).populate([{path : "books"}]);
    if (!author) return res.status(404).json({ message: "author not found" });
    res.status(200).json({ author }); 
  } catch (error) {
    console.log("error in getting author", error);
    res.status(500).json({ message: "error in getting author", error });
  }
}

export const updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, bio, birthDate, books } = req.body;
    const author = { name, bio, birthDate, books };
    const updatedAuthor = await Author.findByIdAndUpdate(id, { $set: author , $inc: {__v : 1}}, { new: true });
    if (!updatedAuthor) return res.status(404).json({ message: "author not found" });
    res.status(200).json({ msg : "Author updated successfully" , updatedAuthor });
  } catch (error) {
    console.log("error in updating author", error);
    res.status(500).json({ message: "error in updating author", error });
  }
} 

export const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedAuthor = await Author.findByIdAndDelete(id);
    if (!deletedAuthor)return res.status(400).json({ message: "author not found" });
    res.status(200).json({ msg : "Author deleted successfully" , deletedAuthor });
  } catch (error) {
    console.log("error in deleting author", error);
    res.status(500).json({ message: "error in deleting author", error });
  }
}