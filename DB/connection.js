import  Mongoose  from "mongoose";
// test monogo atlas
export const db_connection = async () => {
  try {
    await Mongoose.connect(
      "mongodb+srv://nagyosama85:010050079306Nn@bookstore.nv0z4wx.mongodb.net/?retryWrites=true&w=majority&appName=bookStore"
    );
    console.log("connected to DataBase");
  } catch (error) {
    console.log("error in db connection", error);
  }
};
