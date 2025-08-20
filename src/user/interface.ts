export interface SocialLink {
  platform: string;
  url: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  profile_image?: string;
  bio?: string;
  social_links?: SocialLink[];
  is_verified: boolean;
  is_host: boolean;
  created_at: string;
  updated_at: string;
}

export interface UpdateUserRequest {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  profile_image?: string;
  bio?: string;
  social_links?: SocialLink[];
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export interface UserSettings {
  email_notifications: boolean;
  push_notifications: boolean;
  language: string;
  timezone: string;
  privacy_level: "public" | "friends" | "private";
}

export interface UserStats {
  total_hostings: number;
  total_guests: number;
  average_rating: number;
  response_rate: number;
  response_time_hours: number;
}

export interface UserActivityHistory {
  logins: Array<{ timestamp: string; ip: string; location: string }>;
  profile_updates: Array<{ timestamp: string; field: string }>;
  hosting_activities: Array<{ timestamp: string; action: string; details: string }>;
}
