import mongoose from "mongoose";
export interface Host {
  country_place_id: string;
  city_place_id: string;
  area?: string;
  address?: string;
  description?: string;
  bio?: string;
  max_guests: number;
  hosting_type: string[];
  kashrut_level?: string;
  languages: string[];
  total_hostings: number;
  is_always_available: boolean;
  available?: boolean;
  photo_url?: string;
  created_at?: string;
  updated_at?: string;
  user: mongoose.Types.ObjectId | string;
}


export interface CreateHostRequest extends Host {}

export interface UpdateHostRequest extends Partial<Host> {
  id: string;
}
