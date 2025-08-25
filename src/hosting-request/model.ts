import { Schema, model, Document } from "mongoose";

export interface HostingRequestDocument extends Document {
  guest: Schema.Types.ObjectId;
  host: Schema.Types.ObjectId;
  requested_date: Date;
  message: string;
  status: "pending" | "accepted" | "rejected" | "cancelled";
  created_at: Date;
  updated_at: Date;
}

const HostingRequestSchema = new Schema<HostingRequestDocument>(
  {
    guest: { type: Schema.Types.ObjectId, ref: "User", required: true },
    host: { type: Schema.Types.ObjectId, ref: "Host", required: true },
    requested_date: { type: Date, required: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const HostingRequestModel = model<HostingRequestDocument>(
  "HostingRequest",
  HostingRequestSchema
);
