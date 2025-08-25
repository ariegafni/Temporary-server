import { HostingRequestModel } from "./model";
import { CreateHostingRequestDto, HostingRequestFilters } from "./interface";
import { Types } from "mongoose";
import { HostModel } from "../host/model";

export const createHostingRequest = async (guestId: string, data: CreateHostingRequestDto) => {
  const hostDoc = await HostModel.findById(data.host);
  if (!hostDoc) throw new Error("Host not found");

  const hostingRequest = new HostingRequestModel({
    guest: new Types.ObjectId(guestId),
    host: hostDoc._id,
    requested_date: new Date(data.requested_date),
    message: data.message,
    status: "pending",
  });
  await hostingRequest.save();
  return hostingRequest;
};

export const getMyGuestRequests = async (guestId: string, filters?: HostingRequestFilters) => {
  const query: any = { guest: new Types.ObjectId(guestId) };
  if (filters?.status) query.status = filters.status;
  if (filters?.date_from || filters?.date_to) {
    query.requested_date = {};
    if (filters.date_from) query.requested_date.$gte = new Date(filters.date_from);
    if (filters.date_to) query.requested_date.$lte = new Date(filters.date_to);
  }
  return HostingRequestModel.find(query)
    .populate("host", "name photo_url")
    .sort({ created_at: -1 })
    .exec();
};

export const getMyHostRequests = async (userId: string, filters?: HostingRequestFilters) => {
  const hostDoc = await HostModel.findOne({ user: userId });
  if (!hostDoc) return [];

  const query: any = { host: hostDoc._id };
  if (filters?.status) query.status = filters.status;
  if (filters?.date_from || filters?.date_to) {
    query.requested_date = {};
    if (filters.date_from) query.requested_date.$gte = new Date(filters.date_from);
    if (filters.date_to) query.requested_date.$lte = new Date(filters.date_to);
  }

  return HostingRequestModel.find(query)
    .populate("guest", "first_name last_name profile_image")
    .sort({ created_at: -1 })
    .exec();
};

// אישור/דחייה ע"י המארח
export const respondToHostingRequest = async (id: string, status: "accepted" | "rejected", responseMessage?: string) => {
  const request = await HostingRequestModel.findById(id);
  if (!request) throw new Error("Hosting request not found");

  request.status = status;
  if (responseMessage) request.message = `${request.message}\n---\nתגובה: ${responseMessage}`;
  await request.save();
  return request;
};

// ביטול ע"י האורח
export const cancelHostingRequest = async (id: string, guestId: string) => {
  const request = await HostingRequestModel.findOne({ _id: id, guest: guestId });
  if (!request) throw new Error("Hosting request not found or not yours");

  request.status = "cancelled";
  await request.save();
  return request;
};

// מחיקה (למנהל)
export const deleteHostingRequest = async (id: string) => {
  await HostingRequestModel.findByIdAndDelete(id);
};
