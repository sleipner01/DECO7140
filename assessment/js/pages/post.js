import { getCountries } from '../fetch/countries.js';
import { uqcloud_zone_id } from '../config.js';
import { postFormData } from '../fetch/postFormData.js';

function generateShortId() {
  // Generate a UUID4 and take the first 8 characters for a short unique ID
  return crypto.randomUUID().substring(0, 8);
}

function finalizeProductName(name) {
  const uniqueId = generateShortId();
  return `${uniqueId};${name}`;
}

function formatProductOwner(owner, rating) {
  // TODO: remove placeholder
  // return `community;${owner};${rating}`;
  return 'root_test';
}

function formatFilterValues(tags) {
  return tags
    .split(',')
    .map((value) => value.trim())
    .join(';');
}

async function handleFormSubmit(event, form) {
  event.preventDefault();
  const formData = new FormData(form);
  // TODO: Implement form validation
  const post = new FormData();
  post.append(
    'product_name',
    finalizeProductName(formData.get('destination-name'))
  );
  post.append(
    'product_owner',
    formatProductOwner(formData.get('owner'), formData.get('rating'))
  );
  post.append('product_description', formData.get('description'));
  post.append('website_code', uqcloud_zone_id);
  post.append('product_info1', formData.get('country'));
  post.append('product_info2', formatFilterValues(formData.get('tags')));
  post.append('product_info3', formData.get('sustainability-rating'));
  post.append('product_photo', formData.get('image'));

  postFormData(post)
    .then(() => {
      // TODO: Show a success message to the user
      console.info('Form data successfully posted');
      event.target.reset();
    })
    .catch((error) => {
      // TODO: Show an error message to the user
      console.error('Error posting form data:', error);
    });
}

// Set up the form submit event listener
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('post-form');
  form.addEventListener('submit', (event) => handleFormSubmit(event, form));
});

// Set up input field validation
document.addEventListener('DOMContentLoaded', () => {
  document
    .getElementById('destination-name')
    .addEventListener('input', (event) => {
      const input = event.target;
      const value = input.value;
      const isValid = value.length > 0;
      input.setCustomValidity(isValid ? '' : 'Destination name is required');
    });
});

// Populate country datalist
document.addEventListener('DOMContentLoaded', async () => {
  getCountries()
    .then((countries) => {
      // Sort the countries by name
      countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
      const countryList = document.getElementById('country-list');
      countries.forEach((country) => {
        const option = document.createElement('option');
        option.value = country.name.common;
        countryList.appendChild(option);
      });
    })

    .catch((error) => {
      console.error('Error fetching countries:', error);
    });
});

const filters = [
  'sustainable',
  'adventure',
  'beach',
  'history',
  'nature',
  'city',
  'family',
  'kids',
];
document.addEventListener('DOMContentLoaded', () => {
  const filterList = document.getElementById('filter-list');
  filters.forEach((filter) => {
    const option = document.createElement('option');
    option.value = filter;
    filterList.appendChild(option);
  });
});
