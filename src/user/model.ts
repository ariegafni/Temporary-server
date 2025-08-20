import mongoose, { Schema, Document } from "mongoose";

interface SocialLink {
  platform: string;
  url: string;
}

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  profile_image?: string;
  bio?: string;
  social_links?: SocialLink[];
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
  settings: {
    email_notifications: boolean;
    push_notifications: boolean;
    language: string;
    timezone: string;
    privacy_level: "public" | "friends" | "private";
  };
  stats: {
    total_hostings: number;
    total_guests: number;
    average_rating: number;
    response_rate: number;
    response_time_hours: number;
  };
}

const SocialLinkSchema = new Schema(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    profile_image: { type: String },
    bio: { type: String },
    social_links: [SocialLinkSchema],
    is_verified: { type: Boolean, default: false },
    settings: {
      email_notifications: { type: Boolean, default: true },
      push_notifications: { type: Boolean, default: true },
      language: { type: String, default: "he" },
      timezone: { type: String, default: "UTC" },
      privacy_level: {
        type: String,
        enum: ["public", "friends", "private"],
        default: "private",
      },
    },
    stats: {
      total_hostings: { type: Number, default: 0 },
      total_guests: { type: Number, default: 0 },
      average_rating: { type: Number, default: 0 },
      response_rate: { type: Number, default: 0 },
      response_time_hours: { type: Number, default: 0 },
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
