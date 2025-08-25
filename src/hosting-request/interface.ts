import { Types } from "mongoose";

export interface HostingRequest {
  id: string;
  guest: Types.ObjectId | string;
  host: Types.ObjectId | string;
  requested_date: string;
  message: string;
  status: "pending" | "accepted" | "rejected" | "cancelled";
  created_at: string;
  updated_at: string;
  guest_name?: string;
  guest_profile_image?: string;
  host_name?: string;
  host_profile_image?: string;
}

export interface CreateHostingRequestDto {
  host: string;
  requested_date: string;
  message: string;
}

export interface UpdateHostingRequestDto {
  id: string;
  status?: "accepted" | "rejected" | "cancelled";
  message?: string;
}

export interface RespondToHostingRequestDto {
  id: string;
  status: "accepted" | "rejected";
  response_message?: string;
}

export interface HostingRequestFilters {
  status?: "pending" | "accepted" | "rejected" | "cancelled";
  host?: string;
  guest?: string;
  date_from?: string;
  date_to?: string;
}
