import { TRAVEL_PLACES_API_KEY } from '../config.js';
import { cachedFetch } from '../utilities/cachedFetch.js';

export const getDestinations = async (query) => {
  if (TRAVEL_PLACES_API_KEY === '' || TRAVEL_PLACES_API_KEY === undefined) {
    throw new Error('API key is missing');
  }

  const url = 'https://travel-places.p.rapidapi.com/';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-key': TRAVEL_PLACES_API_KEY,
      'x-rapidapi-host': 'travel-places.p.rapidapi.com',
    },
    body: JSON.stringify({ query: query }),
  };
  return await cachedFetch('base-destinations', url, options);
};
