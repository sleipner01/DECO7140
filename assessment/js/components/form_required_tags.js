/**
 * Initialize the form required tags
 * It will add a required class to the labels of required fields.
 * The method requires the form to have labels for the required fields.
 * It will give the labels a required class. Add your own CSS to style the labels.
 */
export default function initializeFormRequiredTags() {
  const form = document.querySelector('form');
  if (!form) {
    console.error('No form found in this document');
    return;
  }

  const requiredFields = form.querySelectorAll('[required]');
  for (const field of requiredFields) {
    // Locate the label for the field
    const label = form.querySelector(`label[for="${field.id}"]`);
    if (!label) {
      console.error('No label found for field:', field);
      continue;
    }

    label.classList.add('required');
  }
}
