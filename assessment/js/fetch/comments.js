import { commentsData } from '../data/comments.js';

/**
 * Fetch comments data
 * @returns {Promise<Array>} - Promise resolving to an array of comment objects
 */
export async function fetchComments() {
  // TODO: Add API endpoint to fetch comments
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(commentsData);
    }, 1000); // Simulate network delay
  });
}
