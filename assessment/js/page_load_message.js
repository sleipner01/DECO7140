/**
 * PageLoadMessage - Required by the assessment to log a message when the page has loaded
 */
export const PageLoadMessage = () => {
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      console.log('Page has loaded javascript');
    });
  }
};
