import { cachedFetch } from '../utilities/cachedFetch.js';

export const getCountries = async () => {
  const url = 'https://restcountries.com/v3.1/all?fields=name';
  const options = {
    method: 'GET',
    redirect: 'follow',
  };
  const staleTime = 86400000; // 24 hours
  return await cachedFetch('base-countries', url, options, staleTime)
    .then((response) => response)
    .catch((error) => {
      console.error('Something went wrong while fetching countries:', error);
    });
};
