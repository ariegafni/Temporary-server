import axios from "axios";

const GOOGLE_KEY = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export class PlacesService {
  static async autocomplete(query: string) {
    const url = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
    const { data } = await axios.get(url, {
      params: {
        input: query,
        key: GOOGLE_KEY,
        language: "he",
        types: "(regions)|(cities)"
      },
    });
    return (data?.predictions ?? []).map((p: any) => ({
      place_id: p.place_id,
      description: p.description,
    }));
  }

  static async reverseGeocode(lat: number, lng: number) {
    const url = "https://maps.googleapis.com/maps/api/geocode/json";
    const { data } = await axios.get(url, {
      params: { latlng: `${lat},${lng}`, key: GOOGLE_KEY, language: "he" },
    });

    let country_place_id: string | null = null;
    let city_place_id: string | null = null;
    let address = "";

    if (data?.results?.length) {
      const top = data.results[0];
      address = top.formatted_address;
      for (const r of data.results) {
        const types = r.types || [];
        if (!country_place_id && types.includes("country")) country_place_id = r.place_id;
        if (!city_place_id && (types.includes("locality") || types.includes("postal_town"))) city_place_id = r.place_id;
      }
      if (!country_place_id) {
        const countryRes = data.results.find((r: any) => (r.types || []).includes("country"));
        country_place_id = countryRes?.place_id ?? null;
      }
    }

    return { country_place_id, city_place_id, address };
  }
}
