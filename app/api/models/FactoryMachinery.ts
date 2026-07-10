// models/FactoryMachinery.ts
import mongoose, { Schema, models, model } from "mongoose";

const FactoryMachinerySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
  },
  { timestamps: true },
);

const FactoryMachinery =
  models.FactoryMachinery || model("FactoryMachinery", FactoryMachinerySchema);
export default FactoryMachinery;
