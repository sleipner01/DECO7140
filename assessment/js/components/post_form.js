export function validateSustainability() {
  const input = document.getElementById('sustainability-rating');
  const value = input.value;
  const isValid = value.length > 0 && 1 <= value && value <= 3;
  input.setCustomValidity(
    isValid ? '' : 'Rating must be at least 1 character and between 1 and 3'
  );
  const errorArea = document.getElementById(
    'sustainability-rating-error-message'
  );
  errorArea.textContent = !isValid
    ? 'Sustainability must be at least 1 character and between 1 and 3'
    : '';

  return isValid;
}

export function validateRating() {
  const input = document.getElementById('rating');
  const value = input.value;
  const isValid = value.length > 0 && 1 <= value && value <= 5;
  input.setCustomValidity(
    isValid ? '' : 'Rating must be at least 1 character and between 1 and 5'
  );
  const errorArea = document.getElementById('rating-error-message');
  errorArea.textContent = !isValid
    ? 'Rating must be at least 1 character and between 1 and 5'
    : '';
  return isValid;
}

export function validateDescription() {
  const value = document.getElementById('description').value;
  const isValid = value.length > 100;
  const errorArea = document.getElementById('description-error-message');
  errorArea.textContent = !isValid
    ? 'Description must be at least 100 characters'
    : '';

  return isValid;
}

export function validateImage() {
  const errorArea = document.getElementById('image-error-message');
  const input = document.getElementById('image');
  const file = input.files[0];
  const maxSize = 2 * 1024 * 1024; // 2 MB
  const isValid = file && file.size <= maxSize;
  input.setCustomValidity(isValid ? '' : 'Image must be less than 2 MB');
  if (!isValid) {
    errorArea.textContent = 'Image must be less than 2 MB';
  } else {
    errorArea.textContent = '';
  }
  return isValid;
}

export function isValidForm() {
  let isValid = true;
  isValid = validateSustainability() && isValid;
  isValid = validateRating() && isValid;
  isValid = validateDescription() && isValid;
  isValid = validateImage() && isValid;
  return isValid;
}

export function initializeFieldValidation() {
  const form = document.getElementById('post-form');
  const submitButton = form.querySelector('button[type="submit"]');

  function checkFormValidity() {
    submitButton.disabled = !isValidForm();
  }

  // Rating
  document.getElementById('rating').addEventListener('input', () => {
    validateRating();
    checkFormValidity();
  });

  // Sustainability
  document
    .getElementById('sustainability-rating')
    .addEventListener('input', () => {
      validateSustainability();
      checkFormValidity();
    });

  // Description
  document.getElementById('description').addEventListener('input', () => {
    validateDescription();
    checkFormValidity();
  });

  // Image
  document.getElementsByName('image')[0].addEventListener('change', () => {
    validateImage();
    checkFormValidity();
  });
}
