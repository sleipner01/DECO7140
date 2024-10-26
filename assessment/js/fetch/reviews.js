import { commentsData } from '../data/reviews.js';

/**
 * Fetch comments data
 * @returns {Promise<Array>} - Promise resolving to an array of comment objects
 */
export async function fetchReviewComments() {
  // TODO: Add API endpoint to fetch comments
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(commentsData);
    }, 1000); // Simulate network delay
  });
}
