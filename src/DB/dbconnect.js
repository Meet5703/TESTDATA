import mongoose from "mongoose";

export async function dbConnect() {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection;
    db.on("connected", () => {
      console.log("connected to db");
    });
    db.on("error", (err) => {
      console.log("db error", err);
      process.exit();
    });
  } catch (error) {
    console.log("something went wrong", error);
  }
}
