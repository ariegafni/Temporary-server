import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserModel } from "../user/model";
import {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
  AuthResponse
} from "./interface";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";

function toUserDto(user: any) {
  return {
    id: user._id.toString(),
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone,
    country: user.country,
    city: user.city,
    profile_image: user.profile_image,
    is_verified: user.is_verified,
    created_at: user.createdAt,
    updated_at: user.updatedAt
  };
}

export class AuthManager {
  static async login(data: LoginRequest): Promise<AuthResponse> {
    const user = await UserModel.findOne({ email: data.email });
    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const access_token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });
    const refresh_token = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: "7d" });

    return {
      user: toUserDto(user),
      access_token,
      refresh_token,
      token_type: "Bearer"
    };
  }

static async register(data: RegisterRequest): Promise<AuthResponse> {
  const existing = await UserModel.findOne({ email: data.email });
  if (existing) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await UserModel.create({
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    phone: data.phone,
    country: data.country,
    city: data.city,
    profile_image: data.profile_image, 
    password: hashedPassword,
  });

  const access_token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "15m" });
  const refresh_token = jwt.sign({ id: newUser._id }, JWT_REFRESH_SECRET, { expiresIn: "7d" });

  return {
    user: toUserDto(newUser),
    access_token,
    refresh_token,
    token_type: "Bearer",
  };
}


  static async logout(_authHeader?: string) {
    return { message: "Logged out" };
  }

  static async refresh(refreshToken: string): Promise<AuthResponse> {
    try {
      const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any;
      const user = await UserModel.findById(payload.id);
      if (!user) throw new Error("User not found");

      const access_token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });
      const new_refresh_token = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: "7d" });

      return {
        user: toUserDto(user),
        access_token,
        refresh_token: new_refresh_token,
        token_type: "Bearer"
      };
    } catch {
      throw new Error("Invalid refresh token");
    }
  }

  static async verifyEmail(data: VerifyEmailRequest) {
    return { message: `Email verified with token ${data.token}` };
  }

  static async forgotPassword(data: ForgotPasswordRequest) {
    return { message: `Password reset email sent to ${data.email}` };
  }

  static async resetPassword(data: ResetPasswordRequest) {
    const hashedPassword = await bcrypt.hash(data.new_password, 10);
    return { message: `Password updated with token ${data.token}`, hashedPassword };
  }

  static async loginWithGoogle(code: string): Promise<AuthResponse> {
    return { user: {} as any, access_token: "mock", refresh_token: "mock", token_type: "Bearer" };
  }

  static async loginWithFacebook(code: string): Promise<AuthResponse> {
    return { user: {} as any, access_token: "mock", refresh_token: "mock", token_type: "Bearer" };
  }
}
