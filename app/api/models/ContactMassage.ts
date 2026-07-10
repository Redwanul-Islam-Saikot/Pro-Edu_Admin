// models/ContactMessage.ts
import mongoose, { Schema, models, model } from "mongoose";

const ContactMessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const ContactMessage =
  models.ContactMessage || model("ContactMessage", ContactMessageSchema);
export default ContactMessage;
