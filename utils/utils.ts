import axios from 'axios';
import { config } from 'dotenv';
import * as Redis from 'redis';

config();

interface Country {
  country: string;
  region: string;
}

async function checkCountries(country: string) {
  const client = Redis.createClient({
    url: 'redis://redis:6379',
  });
  await client.connect();

  const key = 'country';
  const name = 'nameCountries';

  try {
    const searchCountry = country;

    const message = await client.hGet(key, name);

    const response = !message?.length
      ? searchCountriesNameSite(searchCountry)
      : JSON.parse(message);

    if (!message) await client.hSet(key, name, JSON.stringify(response?.data));

    const data = await searchCountriesNameCache(message ?? '', searchCountry);

    // const data = response?.data;

    await client.expire(key, 600);
    if (data?.length === 0) {
      return {
        message: 'País não encontrado',
      };
    } else {
      return data;
    }
  } catch (error) {
    return {
      message: `Erro ao consultar País:, ${error}`,
    };
  }
}

async function searchCountriesNameCache(
  arrayCountries: string,
  valueSearch: string,
) {
  if (!valueSearch && !valueSearch.length)
    return JSON.parse(arrayCountries)?.data;
  let countries = Object.values(
    JSON.parse(arrayCountries)?.data,
  ) as unknown as Country[];
  let filterArray = filterCountries(countries, valueSearch);
  if (!filterArray) {
    await searchCountriesNameSite(valueSearch).then((value) => {
      countries = Object.values(value?.data);
    });
    filterArray = filterCountries(countries, valueSearch);
  }
  return filterArray;
}

async function searchCountriesNameSite(valueSearch: string) {
  return await axios.get(
    `https://api.first.org/data/v1/countries${valueSearch ? `?q=${valueSearch}` : ''}`,
  );
}

function filterCountries(countries: Country[], valueSearch: string) {
  return countries.filter(
    (value: Country) =>
      value.country
        .toLocaleLowerCase()
        .includes(valueSearch.toLocaleLowerCase()) ||
      value.region
        .toLocaleLowerCase()
        .includes(valueSearch.toLocaleLowerCase()),
  );
}

export { checkCountries };
