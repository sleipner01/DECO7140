export const PageLoadMessage = () => {
    if (typeof window !== 'undefined') {
        window.addEventListener('load', () => {
            console.log('Page has loaded javascript');
        });
    }
};
