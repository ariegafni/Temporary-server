import mongoose, { Schema, Document } from "mongoose";
import { Host } from "./interface";

export interface HostDocument extends Host, Document {}

const HostSchema = new Schema<HostDocument>(
  {
    country_place_id: { type: String, required: true },
    city_place_id: { type: String, required: true },
    area: { type: String },
    address: String,
    description: String,
    bio: String,
    max_guests: { type: Number, required: true },
    hosting_type: { type: [String], required: true },
    kashrut_level: String,
    languages: { type: [String], default: [] },
    total_hostings: { type: Number, default: 0 },
    is_always_available: { type: Boolean, default: false },
    available: { type: Boolean, default: true },
    photo_url: String,
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const HostModel = mongoose.model<HostDocument>("Host", HostSchema);
