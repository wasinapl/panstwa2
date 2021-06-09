import mongoose from "mongoose";
import db from "../db";

const categoryModel = new mongoose.Schema({
  name: String,
});

const Category = db.model("categories", categoryModel);

export default Category;
