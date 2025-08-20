import { UserModel } from "./model";
import bcrypt from "bcryptjs";
import {
  UpdateUserRequest,
  ChangePasswordRequest,
  UserSettings,
  UserActivityHistory,
  UserStats,
  User,
} from "./interface";

function toUserDto(user: any): User {
  return {
    id: user._id.toString(),
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    phone: user.phone,
    profile_image: user.profile_image,
    bio: user.bio,
    social_links: user.social_links,
    is_verified: user.is_verified,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}

export class UserManager {
  static async getCurrentUser(userId: string) {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found");
    return toUserDto(user);
  }

  static async updateProfile(userId: string, data: UpdateUserRequest) {
    const updated = await UserModel.findByIdAndUpdate(userId, data, { new: true });
    if (!updated) throw new Error("User not found");
    return toUserDto(updated);
  }

  static async changePassword(userId: string, data: ChangePasswordRequest) {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(data.current_password, user.password);
    if (!valid) {
      throw new Error("Current password incorrect");
    }

    user.password = await bcrypt.hash(data.new_password, 10);
    await user.save();

    return { message: "Password updated successfully" };
  }

  static async deleteAccount(userId: string) {
    await UserModel.findByIdAndDelete(userId);
    return { message: "Account deleted" };
  }

  static async uploadProfileImage(userId: string, file: Express.Multer.File | undefined) {
    if (!file) throw new Error("No file uploaded");
    const updated = await UserModel.findByIdAndUpdate(
      userId,
      { profile_image: `/uploads/${file.filename}` }, // החזרת URL יחסי
      { new: true }
    );
    if (!updated) throw new Error("User not found");
    return { profile_image: updated.profile_image };
  }

  static async getActivityHistory(userId: string): Promise<UserActivityHistory> {
    // כאן אפשר לשמור לוגים אמיתיים במסד נתונים נפרד
    return {
      logins: [{ timestamp: new Date().toISOString(), ip: "127.0.0.1", location: "Localhost" }],
      profile_updates: [{ timestamp: new Date().toISOString(), field: "bio" }],
      hosting_activities: [{ timestamp: new Date().toISOString(), action: "created", details: "new host" }],
    };
  }

  static async getUserSettings(userId: string): Promise<UserSettings> {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found");
    return user.settings;
  }

  static async updateUserSettings(userId: string, settings: Partial<UserSettings>) {
    await UserModel.findByIdAndUpdate(userId, { $set: { settings } }, { new: true });
    return { message: "Settings updated" };
  }

  static async getUserStats(userId: string): Promise<UserStats> {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error("User not found");
    return user.stats;
  }
}
