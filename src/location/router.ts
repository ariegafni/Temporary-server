import { Router } from "express";
import { LocationsController } from "./controller";

const router = Router();

router.get("/countries", LocationsController.getCountries);
router.get("/cities/country/:country_place_id", LocationsController.getCitiesByCountry);
router.get("/search", LocationsController.search);
router.get("/reverse-geocode", LocationsController.reverseGeocode);
router.get("/nearby", LocationsController.nearby);
router.get("/popular", LocationsController.popular);
router.get("/autocomplete", LocationsController.autocomplete);

export default router;
