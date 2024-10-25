import { getCountries } from '../fetch/countries.js';
import { uqcloud_zone_id } from '../config.js';
import { postFormData } from '../fetch/postFormData.js';
import initializeFormRequiredTags from '../components/form_required_tags.js';
import Alert from '../components/alert.js';
import {
  initializeFieldValidation,
  isValidForm,
} from '../components/post_form.js';

/*
 * Generate a UUID4 and take the first 8 characters for a short unique ID
 */
function generateShortId() {
  return crypto.randomUUID().substring(0, 8);
}

/*
 * Finalize the product name by prepending a unique ID
 */
function finalizeProductName(name) {
  const uniqueId = generateShortId();
  return `${uniqueId};${name}`;
}

/*
 * Format the collection, product owner and rating
 */
function formatProductOwner(owner, rating) {
  return `community;${owner};${rating}`;
}

/*
 * Format the filter values to be separated by semicolons
 */
function formatFilterValues(tags) {
  return tags
    .split(',')
    .map((value) => value.trim())
    .join(';');
}

/*
 * Format the form data for posting
 * to fit the API requirements
 */
function formatFormData(formData) {
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
  return post;
}

function toggleSpinner() {
  const spinner = document.getElementById('form-loading-spinner');
  spinner.classList.toggle('hidden');
  spinner.setAttribute(
    'aria-hidden',
    spinner.getAttribute('aria-hidden') === 'true' ? 'false' : 'true'
  );
}

async function handleFormSubmit(event, form, alertElement) {
  event.preventDefault();
  const formData = new FormData(form);

  if (!isValidForm()) {
    Alert({
      message: 'Please fill in all required fields with valid values',
      type: 'error',
      parent: alertElement,
    });
  }
  const post = formatFormData(formData);

  toggleSpinner();
  postFormData(post)
    .then((response) => {
      console.info(response.message);
      console.info('Form data successfully posted');
      Alert({
        message: 'Form data successfully posted',
        type: 'success',
        parent: alertElement,
      });
      event.target.reset();
    })
    .catch((error) => {
      Alert({
        message:
          'Something went wrong when posting the form data. Contact support if the problem persists.',
        type: 'error',
        parent: alertElement,
      });
      console.error('Error posting form data:', error);
    })
    .finally(() => {
      toggleSpinner();
    });
}

// Set up the form
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('post-form');
  const alertElement = document.getElementById('alert-area');
  form.addEventListener('submit', (event) =>
    handleFormSubmit(event, form, alertElement)
  );
  initializeFieldValidation();
  initializeFormRequiredTags();
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
