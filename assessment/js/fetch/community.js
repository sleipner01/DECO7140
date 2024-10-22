import { student_number, uqcloud_zone_id } from '../config.js';
import { cachedFetch } from '../utilities/cachedFetch.js';

const communityCollectionKey = 'community';

function getCollectionKey(product_owner) {
  const [collection] = product_owner.split(';');
  return collection;
}

function filter(data) {
  return data.filter(
    (post) => getCollectionKey(post.product_owner) === communityCollectionKey
  );
}

function formatResponseData(data) {
  return data.map((post) => {
    const [id, name] = post.product_name.split(';');
    const [collection, owner, rating] = post.product_owner.split(';');
    const filters = post.product_info2 ? post.product_info2.split(';') : [];
    const sustainabilityRating = isNaN(Number(post.product_info3))
      ? 0
      : Number(post.product_info3);
    return {
      id,
      collection,
      owner,
      rating,
      name,
      description: post.product_description,
      country: post.product_info1,
      filters,
      sustainability_rating: sustainabilityRating,
      image: post.product_photo,
    };
  });
}

export const getCommunityPosts = async () => {
  if (student_number === '' || student_number === undefined) {
    throw new Error('Student number is missing');
  }
  if (uqcloud_zone_id === '' || uqcloud_zone_id === undefined) {
    throw new Error('Zone ID is missing');
  }

  const headers = new Headers();
  headers.append('student_number', student_number); // Replace with actual student number
  headers.append('uqcloud_zone_id', uqcloud_zone_id); // Replace with actual zone ID

  const url =
    'https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericproduct/';
  const options = {
    method: 'GET',
    headers,
    redirect: 'follow',
  };
  return await cachedFetch('community_posts', url, options)
    .then((response) => filter(response))
    .then((response) => formatResponseData(response))
    .catch((error) => {
      console.error('Something went wrong while fetching posts:', error);
    });
};

export const getCommunityPost = async (id) => {
  try {
    const data = await getCommunityPosts();
    return data.find((post_1) => post_1.id === id);
  } catch (error) {
    console.error('Something went wrong while fetching the post:', error);
  }
};
