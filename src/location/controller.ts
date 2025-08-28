import { Request, Response } from "express";
import { LocationsManager } from "./manager";

export class LocationsController {
 static async getCountriesWithHosts(req: Request, res: Response) {
  res.json(await LocationsManager.getCountriesWithHosts());
}


  static async getCitiesByCountry(req: Request, res: Response) {
    res.json(await LocationsManager.getCitiesByCountry(req.params.country_place_id));
  }

  static async search(req: Request, res: Response) {
    const { query, country_place_id, city_place_id, limit } = req.query as any;
    res.json(await LocationsManager.search({
      query,
      country_place_id,
      city_place_id,
      limit: limit ? Number(limit) : undefined,
    }));
  }

  static async reverseGeocode(req: Request, res: Response) {
    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);
    res.json(await LocationsManager.reverseGeocode(lat, lng));
  }

  static async nearby(req: Request, res: Response) {
    const lat = Number(req.query.lat);
    const lng = Number(req.query.lng);
    const radius = req.query.radius ? Number(req.query.radius) : 10;
    res.json(await LocationsManager.nearby(lat, lng, radius));
  }

  static async popular(req: Request, res: Response) {
    res.json(await LocationsManager.popular());
  }

  static async autocomplete(req: Request, res: Response) {
    const { query } = req.query as any;
    res.json(await LocationsManager.autocomplete(query ?? ""));
  }
}
