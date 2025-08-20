import { HostModel } from "../host/model";
import { CountryModel, CityModel } from "./model";
import { PlacesService } from "./service";


export class LocationsManager {
  static async getCountries() {
    const agg = await HostModel.aggregate([
      { $group: { _id: "$country_place_id", host_count: { $sum: 1 } } },
    ]);
    const mapCounts = new Map<string, number>(agg.map((a: any) => [a._id, a.host_count]));
    const countries = await CountryModel.find({ place_id: { $in: Array.from(mapCounts.keys()) } }).lean();
    const merged = countries.map((c) => ({ ...c, host_count: mapCounts.get(c.place_id) || 0 }));
    const missingIds = Array.from(mapCounts.keys()).filter((pid) => !countries.find((c) => c.place_id === pid));
    const missing = missingIds.map((pid) => ({ place_id: pid, name: pid, host_count: mapCounts.get(pid) || 0 }));
    return [...merged, ...missing].sort((a, b) => (b.host_count || 0) - (a.host_count || 0));
  }

  static async getCitiesByCountry(country_place_id: string) {
    const agg = await HostModel.aggregate([
      { $match: { country_place_id } },
      { $group: { _id: "$city_place_id", host_count: { $sum: 1 } } },
    ]);
    const mapCounts = new Map<string, number>(agg.map((a: any) => [a._id, a.host_count]));
    const cities = await CityModel.find({ place_id: { $in: Array.from(mapCounts.keys()) }, country_place_id }).lean();
    const merged = cities.map((c) => ({ ...c, host_count: mapCounts.get(c.place_id) || 0 }));
    const missingIds = Array.from(mapCounts.keys()).filter((pid) => !cities.find((c) => c.place_id === pid));
    const missing = missingIds.map((pid) => ({ place_id: pid, name: pid, country_place_id, host_count: mapCounts.get(pid) || 0 }));
    return [...merged, ...missing].sort((a, b) => (b.host_count || 0) - (a.host_count || 0));
  }

  static async search(params: { query?: string; country_place_id?: string; city_place_id?: string; limit?: number }) {
    const limit = Math.min(params.limit ?? 20, 100);

    const countries = await CountryModel
      .find(params.query ? { $text: { $search: params.query } } : {})
      .limit(limit)
      .lean();

    const citiesQuery: any = {};
    if (params.query) citiesQuery.$text = { $search: params.query };
    if (params.country_place_id) citiesQuery.country_place_id = params.country_place_id;
    const cities = await CityModel.find(citiesQuery).limit(limit).lean();

    return { countries, cities };
  }

  static async reverseGeocode(lat: number, lng: number) {
    return PlacesService.reverseGeocode(lat, lng);
  }

  static async autocomplete(query: string) {
    return PlacesService.autocomplete(query);
  }

  static async nearby(_lat: number, _lng: number, _radiusKm: number) {
    return { countries: [], cities: [] }; // דורש lat/lng על הוסט/עיר כדי לתמוך בג׳יאו
  }

  static async popular() {
    const countries = await this.getCountries();
    const topCountries = countries.slice(0, 12);

    const citiesAgg = await HostModel.aggregate([
      { $group: { _id: { city_place_id: "$city_place_id", country_place_id: "$country_place_id" }, host_count: { $sum: 1 } } },
      { $sort: { host_count: -1 } },
      { $limit: 24 },
    ]);

    const cityIds = citiesAgg.map((c: any) => c._id.city_place_id);
    const cityDocs = await CityModel.find({ place_id: { $in: cityIds } }).lean();
    const cities = citiesAgg.map((c: any) => {
      const doc = cityDocs.find((d) => d.place_id === c._id.city_place_id);
      return {
        place_id: c._id.city_place_id,
        name: doc?.name ?? c._id.city_place_id,
        country_place_id: c._id.country_place_id,
        host_count: c.host_count,
      };
    });

    return { countries: topCountries, cities };
  }
}
