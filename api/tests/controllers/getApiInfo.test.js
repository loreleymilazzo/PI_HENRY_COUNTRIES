const {getApiInfo} = require('../../src/controllers/countriesControllers');

const axios = require('axios');

jest.mock('axios');

describe('getApiInfo', () => {
  it('should return the expected API information', async () => {
    const expectedData = [
      {
        id: 'ID1',
        name: 'Country 1',
        continents: 'Continent 1',
        capital: 'Capital 1',
        subregion: 'Subregion 1',
        area: 100,
        population: 1000000,
        borders: ['Border 1', 'Border 2'],
        platillo: 'Platillo 1',
      },
      
    ];

    const response = {
      data: [
        {
          cca3: 'ID1',
          name: { common: 'Country 1' },
          flags: ['image-url-1'],
          continents: ['Continent 1'],
          capital: ['Capital 1'],
          subregion: 'Subregion 1',
          area: 100,
          population: 1000000,
          borders: ['Border 1', 'Border 2'],
          platillo: 'Platillo 1',
        },
        
      ],
    };

    axios.get.mockResolvedValue(response);

    const result = await getApiInfo();

    expect(result).toEqual(expectedData);
  });
});
