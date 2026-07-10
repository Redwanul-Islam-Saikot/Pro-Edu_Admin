// models/Product.ts
import mongoose, { Schema, models, model } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number },
    image: { type: String },
    category: { type: String },
  },
  { timestamps: true },
);

const Product = models.Product || model("Product", ProductSchema);
export default Product;
