export default function AlternatingName() {
  if (typeof document === 'undefined') {
    console.error('This code must be run in a browser environment.');
    return;
  }

  // Code below written by ChatGPT o1-preview
  document.addEventListener('DOMContentLoaded', () => {
    const words = ['Alicja', 'Bob', 'Charlie', 'Diana', 'Eve'];
    let currentIndex = 0;

    const nameElement = document.getElementById('alternating-name');

    function changeName() {
      // Add the slide-out-up class to trigger the slide-out animation
      nameElement.classList.add('slide-out-up');

      // After the slide-out animation ends, change the text and start the slide-in animation
      setTimeout(() => {
        nameElement.classList.remove('slide-out-up');
        currentIndex = (currentIndex + 1) % words.length;
        nameElement.textContent = words[currentIndex] + '!';
        nameElement.classList.add('slide-in-up');

        // Remove the slide-in-up class after the animation completes
        setTimeout(() => {
          nameElement.classList.remove('slide-in-up');
        }, 500); // Duration of the slide-in-up animation
      }, 500); // Duration of the slide-out-up animation
    }

    // Call changeName every 5 seconds
    setInterval(changeName, 5000);
  });
}
