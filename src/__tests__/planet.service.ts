import axiosMock from '../config/axios.mock';
import { PlanetService } from '../services/planet.service';
import { Planet } from '../models/planet.model';

const responsObject = {
  count: 61,
  next: 'https://swapi.co/api/planets/?page=2',
  previous: null,
  results: [
    {
      name: 'Alderaan',
      rotation_period: '24',
      orbital_period: '364',
      diameter: '12500',
      climate: 'temperate',
      gravity: '1 standard',
      terrain: 'grasslands, mountains',
      surface_water: '40',
      population: '2000000000',
      residents: [
        'https://swapi.co/api/people/5/',
        'https://swapi.co/api/people/68/',
        'https://swapi.co/api/people/81/'
      ],
      films: ['https://swapi.co/api/films/6/', 'https://swapi.co/api/films/1/'],
      created: '2014-12-10T11:35:48.479000Z',
      edited: '2014-12-20T20:58:18.420000Z',
      url: 'https://swapi.co/api/planets/2/'
    }
  ]
};

axiosMock
  .onGet('https://swapi.co/api/planets/', { params: { page: 1 } })
  .reply(200, responsObject);

axiosMock
  .onGet('https://swapi.co/api/planets/1')
  .reply(200, responsObject.results[0]);

describe('Services: Planet Service', () => {
  it('should respond have the result a Planet array', async () => {
    const result = await PlanetService.getPlanets(1);
    expect(typeof result.count === 'number').toBe(true);
    expect(Array.isArray(result.planets)).toBe(true);
    expect(result.planets[0] instanceof Planet).toBe(true);
  });

  it('should return 1 single planet', async () => {
    const result = await PlanetService.getPlanet('1');
    expect(result instanceof Planet).toBe(true);
  });

  it('should return a Planet instance', async () => {
    const planet = PlanetService.toPlanet(responsObject.results[0]);
    expect(planet instanceof Planet).toBe(true);
    expect(planet.id).toBe('2');
  });
});
