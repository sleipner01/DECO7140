/**
 * Fetch data from a URL and cache the response in localStorage
 * @param {string} cacheKey - The key to use for the cache
 * @param {string} url - The URL to fetch data from
 * @param {object} options - Options to pass to the Fetch API
 * @param {number} cacheDuration - The duration to cache the data in milliseconds
 * @returns {Promise} - The data from the URL
 */
export async function cachedFetch(
  cacheKey,
  url,
  options = {},
  cacheDuration = 3600000
) {
  // Check if the cache exists in localStorage
  let cacheData = handleCache(cacheKey, cacheDuration);
  if (cacheData) {
    console.info(`Cache hit for ${cacheKey}`);
    return cacheData;
  }

  // Make the Fetch API request
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  setCache(cacheKey, data);
  return data;
}

function handleCache(cacheKey, cacheDuration) {
  if (typeof window === 'undefined') {
    return null;
  }

  // Check if the cache exists in localStorage
  let cacheEntry = localStorage.getItem(cacheKey);

  if (cacheEntry) {
    try {
      cacheEntry = JSON.parse(cacheEntry);

      // Check if the cached data is still valid
      if (Date.now() - cacheEntry.timestamp < cacheDuration) {
        // Return the cached data
        return cacheEntry.data;
      } else {
        // Cache is expired, remove it
        console.info(`Cache expired for ${cacheKey}`);
        localStorage.removeItem(cacheKey);
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      // If there's an error parsing the cache, remove it
      localStorage.removeItem(cacheKey);
    }
  }
  return null;
}

function setCache(cacheKey, data) {
  if (typeof window === 'undefined') {
    return;
  }
  // Store the data in localStorage with a timestamp
  const cacheEntry = {
    timestamp: Date.now(),
    data: data,
  };
  localStorage.setItem(cacheKey, JSON.stringify(cacheEntry));
}

/**
 * Post data to the server and revalidate the cache
 * @param {string} url - The URL to post data to
 * @param {object} headers - Headers to pass to the Fetch API
 * @param {object} data - The data to post. Ensure this is of the correct type for the Fetch API
 * @param {string} cacheKey - The key to use for the cache
 */
export async function postAndRevalidate(url, headers, data, cacheKey) {
  const options = {
    method: 'POST',
    headers,
    body: data,
  };
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
  }
  const responseData = await response.json();
  localStorage.removeItem(cacheKey);
  console.info(`Cache invalidated for ${cacheKey}`);
  return responseData;
}
