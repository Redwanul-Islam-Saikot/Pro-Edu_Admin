// models/About.ts
import mongoose, { Schema, models, model } from "mongoose";

const AboutSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    image: { type: String },
    paragraphs: [{ type: String }],
  },
  { timestamps: true },
);

const About = models.About || model("About", AboutSchema);
export default About;
