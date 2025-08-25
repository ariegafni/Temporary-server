import { HostModel } from "./model";
import { CreateHostRequest, UpdateHostRequest } from "./interface";
import { UserModel } from "../user/model";

export class HostManager {
  static async getAllHosts() {
  return await HostModel.find()
    .populate("user", "first_name last_name profile_image");
}

 static async getHostsByCountry(country_place_id: string) {
  return await HostModel.find({ country_place_id })
    .populate("user", "first_name last_name profile_image");
}

  static async getHostById(id: string) {
  return await HostModel.findById(id)
    .populate("user", "first_name last_name profile_image");
}

  static async getHostByUserId(userId: string) {
  return await HostModel.findOne({ user: userId })
    .populate("user", "first_name last_name profile_image");
}

  static async createHost(userId: string, data: CreateHostRequest) {
    const host = await HostModel.create({ ...data, user: userId });
    await UserModel.findByIdAndUpdate(userId, { is_host: true });
    return host;
  }

  static async updateHost(data: UpdateHostRequest & { userId: string }) {
    const host = await HostModel.findOneAndUpdate(
      { _id: data.id, user: data.userId },
      data,
      { new: true }
    );
    if (!host) throw new Error("Host not found or unauthorized");
    return host;
  }

  static async deleteHost(id: string, userId: string) {
    const host = await HostModel.findOneAndDelete({ _id: id, user: userId });
    if (!host) throw new Error("Host not found or unauthorized");

    // אם המשתמש מחק את האירוח האחרון שלו, אפשר להחזיר אותו ל־is_host=false
    const stillHost = await HostModel.exists({ user: userId });
    if (!stillHost) {
      await UserModel.findByIdAndUpdate(userId, { is_host: false });
    }

    return { message: "Host deleted" };
  }
}
