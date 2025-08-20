export interface Country {
  place_id: string;
  name: string;
  host_count: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface City {
  place_id: string;
  name: string;
  country_place_id: string;
  host_count: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateCountryRequest extends Omit<Country, "created_at" | "updated_at"> {}
export interface UpdateCountryRequest extends Partial<CreateCountryRequest> { id: string; }

export interface CreateCityRequest extends Omit<City, "created_at" | "updated_at"> {}
export interface UpdateCityRequest extends Partial<CreateCityRequest> { id: string; }
