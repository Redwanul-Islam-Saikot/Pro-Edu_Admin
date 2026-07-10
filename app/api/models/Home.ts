// models/Home.ts
import mongoose, { Schema, models, model } from "mongoose";

const HomeSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    heroImage: { type: String },
    description: { type: String },
  },
  { timestamps: true },
);

const Home = models.Home || model("Home", HomeSchema);
export default Home;
