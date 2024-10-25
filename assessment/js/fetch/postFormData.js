import { postAndRevalidate } from '../utilities/cachedFetch.js';
import { student_number, uqcloud_zone_id } from '../config.js';

export async function postFormData(formData) {
  if (student_number === '' || student_number === undefined) {
    throw new Error('Student number is missing');
  }
  if (uqcloud_zone_id === '' || uqcloud_zone_id === undefined) {
    throw new Error('Zone ID is missing');
  }

  if (!(formData instanceof FormData)) {
    throw new Error('formData is not an instance of FormData');
  }

  const url =
    'https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericproduct/';
  const headers = new Headers();
  headers.append('student_number', student_number);
  headers.append('uqcloud_zone_id', uqcloud_zone_id);

  return await postAndRevalidate(url, headers, formData, 'destinations');
}
