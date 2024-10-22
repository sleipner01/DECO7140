import { getBookmarks } from '../components/bookmark.js';
import { getDestination } from '../fetch/destinations.js';
import { getCommunityPost } from '../fetch/community.js';

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
  ).then((destinations) =>
    // Need to filter out any undefined values
    // because community posts are also stored in the bookmarks
    destinations.filter((destination) => destination !== undefined)
  );
};

export const getBookmarkedCommunityPosts = async () => {
  const communityPosts = getBookmarks();
  if (communityPosts.length === 0) {
    return [];
  }

  return await Promise.all(
    communityPosts.map(async (id) => {
      const post = await getCommunityPost(id);
      return post;
    })
  ).then((destinations) =>
    // Need to filter out any undefined values
    // because destinations are also stored in the bookmarks
    destinations.filter((destination) => destination !== undefined)
  );
};
