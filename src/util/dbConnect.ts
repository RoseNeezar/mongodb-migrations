import mongoose from "mongoose";

const url = "mongodb://root:example@localhost:27017/todo?authSource=admin";

export const dbConnect = mongoose.connect(url);
