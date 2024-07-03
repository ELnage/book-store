import  Mongoose  from "mongoose";

export const db_connection = async () => {
  try {
    await Mongoose.connect("mongodb://127.0.0.1:27017/book-store");
    console.log("connected to DataBase");
  } catch (error) {
    console.log("error in db connection", error);
  }
};
