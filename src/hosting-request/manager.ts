import { HostingRequestModel } from "./model";
import { CreateHostingRequestDto, HostingRequestFilters } from "./interface";
import { Types } from "mongoose";

export const createHostingRequest = async (
  guestId: string,
  data: CreateHostingRequestDto
) => {
  const hostingRequest = new HostingRequestModel({
    guest: new Types.ObjectId(guestId),
    host: new Types.ObjectId(data.host),
    requested_date: new Date(data.requested_date),
    message: data.message,
    status: "pending",
  });
  await hostingRequest.save();
  return hostingRequest;
};

export const getMyGuestRequests = async (
  guestId: string,
  filters?: HostingRequestFilters
) => {
  const query: any = { guest: new Types.ObjectId(guestId) };
  if (filters?.status) query.status = filters.status;
  if (filters?.date_from || filters?.date_to) {
    query.requested_date = {};
    if (filters.date_from)
      query.requested_date.$gte = new Date(filters.date_from);
    if (filters.date_to)
      query.requested_date.$lte = new Date(filters.date_to);
  }
  return HostingRequestModel.find(query)
    .populate("host", "name photo_url")
    .sort({ created_at: -1 })
    .exec();
};

export const getMyHostRequests = async (
  hostId: string,
  filters?: HostingRequestFilters
) => {
  const query: any = { host: new Types.ObjectId(hostId) };
  if (filters?.status) query.status = filters.status;
  if (filters?.date_from || filters?.date_to) {
    query.requested_date = {};
    if (filters.date_from)
      query.requested_date.$gte = new Date(filters.date_from);
    if (filters.date_to)
      query.requested_date.$lte = new Date(filters.date_to);
  }
  return HostingRequestModel.find(query)
    .populate("guest", "first_name last_name profile_image")
    .sort({ created_at: -1 })
    .exec();
};
