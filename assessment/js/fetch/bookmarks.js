import { getBookmarks } from '../components/bookmark.js';
import { getDestination } from '../fetch/destinations.js';

export const getBookmarkedDestinations = async () => {
  const destinationIds = getBookmarks();
  if (destinationIds.length === 0) {
    return [];
  }

  return await Promise.all(
    destinationIds.map(async (id) => {
      const destination = await getDestination(id);
      return destination;
    })
  );
};
