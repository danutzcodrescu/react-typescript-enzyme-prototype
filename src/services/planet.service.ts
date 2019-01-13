import axios from 'axios';
import { Planet } from '../models/planet.model';

export interface PlanetsJSON {
  count: number;
  next: string;
  previous: string;
  results: PlanetsResult[];
}

export interface PlanetsResult {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

export class PlanetService {
  static url = 'https://swapi.co/api/planets/';

  static async getPlanets(page: number) {
    const { data } = await axios.get<PlanetsJSON>(this.url, {
      params: { page }
    });
    return {
      count: data.count,
      planets: data.results.map(PlanetService.toPlanet)
    };
  }

  static async getPlanet(id: string) {
    const resp = await axios.get(this.url + id);
    return PlanetService.toPlanet(resp.data);
  }

  static toPlanet(planet: PlanetsResult) {
    const regex = new RegExp(/planets\/([0-9]{1,})/);
    return new Planet(
      planet.url.match(regex)![1],
      planet.name,
      parseInt(planet.diameter, 10),
      parseInt(planet.rotation_period, 10),
      parseInt(planet.orbital_period, 10),
      planet.gravity,
      parseInt(planet.population, 10) || planet.population,
      planet.climate,
      planet.terrain,
      planet.surface_water,
      new Date(planet.created),
      new Date(planet.edited)
    );
  }
}
