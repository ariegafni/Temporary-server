import mongoose, { Schema, Document } from "mongoose";
import { Country, City } from "./interface";

export interface CountryDocument extends Country, Document {}
export interface CityDocument extends City, Document {}

const CountrySchema = new Schema<CountryDocument>(
  {
    place_id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    host_count: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

CountrySchema.index({ name: "text" });

const CitySchema = new Schema<CityDocument>(
  {
    place_id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    country_place_id: { type: String, required: true, index: true },
    host_count: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

CitySchema.index({ name: "text" });
CitySchema.index({ country_place_id: 1 });

export const CountryModel = mongoose.model<CountryDocument>("Country", CountrySchema);
export const CityModel = mongoose.model<CityDocument>("City", CitySchema);
