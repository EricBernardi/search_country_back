import axios from 'axios';
import { config } from 'dotenv';

config();

async function checkCountries(country: string) {
  try {
    const searchCountry = country.length ? `?q=${country}` : '';

    const response = await axios.get(
      `https://api.first.org/data/v1/countries${searchCountry}`,
    );

    const data = response.data;

    if (response.data?.data.length === 0) {
      return {
        message: 'País não encontrado',
      };
    } else {
      return data.data;
    }
  } catch (error) {
    return {
      message: `Erro ao consultar País:, ${error}`,
    };
  }
}

export { checkCountries };
