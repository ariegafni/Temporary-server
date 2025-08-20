import { HostModel } from "./model";
import { CreateHostRequest, UpdateHostRequest } from "./interface";

export class HostManager {
  static async getAllHosts() {
    return await HostModel.find();
  }

  static async getHostsByCountry(country_place_id: string) {
    return await HostModel.find({ country_place_id });
  }

  static async getHostById(id: string) {
    return await HostModel.findById(id);
  }

  static async createHost(data: CreateHostRequest) {
    const host = new HostModel(data);
    return await host.save();
  }

  static async updateHost(data: UpdateHostRequest) {
    return await HostModel.findByIdAndUpdate(data.id, data, { new: true });
  }

  static async deleteHost(id: string) {
    await HostModel.findByIdAndDelete(id);
    return { message: "Host deleted" };
  }
}
