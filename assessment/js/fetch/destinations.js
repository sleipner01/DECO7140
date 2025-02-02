import { student_number, uqcloud_zone_id } from '../config.js';
import { cachedFetch } from '../utilities/cachedFetch.js';

const destinationsCollectionKey = 'destinations';

function getCollectionKey(product_owner) {
  const [collection] = product_owner.split(';');
  return collection;
}

function filter(data) {
  return data.filter(
    (destination) =>
      getCollectionKey(destination.product_owner) === destinationsCollectionKey
  );
}

function formatResponseData(data) {
  return data.map((destination) => {
    const [id, name] = destination.product_name.split(';');
    const [collection, owner] = destination.product_owner.split(';');
    const filters = destination.product_info2
      ? destination.product_info2.split(';')
      : [];
    const sustainabilityRating = isNaN(Number(destination.product_info3))
      ? 0
      : Number(destination.product_info3);
    return {
      id,
      collection,
      owner,
      name,
      description: destination.product_description,
      country: destination.product_info1,
      filters,
      sustainability_rating: sustainabilityRating,
      image: destination.product_photo,
    };
  });
}

export const getDestinations = async () => {
  if (student_number === '' || student_number === undefined) {
    throw new Error('Student number is missing');
  }
  if (uqcloud_zone_id === '' || uqcloud_zone_id === undefined) {
    throw new Error('Zone ID is missing');
  }

  const headers = new Headers();
  headers.append('student_number', student_number);
  headers.append('uqcloud_zone_id', uqcloud_zone_id);

  const url =
    'https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericproduct/';
  const options = {
    method: 'GET',
    headers,
    redirect: 'follow',
  };
  return await cachedFetch('base-destinations', url, options)
    .then((response) => filter(response))
    .then((response) => formatResponseData(response))
    .catch((error) => {
      console.error('Something went wrong while fetching destinations:', error);
    });
};

export const getDestination = async (id) => {
  try {
    const data = await getDestinations();
    return data.find((destination_1) => destination_1.id === id);
  } catch (error) {
    console.error(
      'Something went wrong while fetching the destination:',
      error
    );
  }
};
