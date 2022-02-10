import PropTypes from 'prop-types';

const propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    photoUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

export default propTypes;
