import PropTypes from 'prop-types';

export const pageShape = {
  heroImage: PropTypes.string,
  heroTitle: PropTypes.string,
  heroSubtitle: PropTypes.string,
};

export const offerShape = {
  uuid: PropTypes.string,
  nid: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
  rating: PropTypes.string,
  feedbackCount: PropTypes.number,
  photo: PropTypes.string,
};

export default { pageShape, offerShape };
