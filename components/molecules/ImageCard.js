/* eslint-disable react/default-props-match-prop-types */
import React from 'react';
import { Card, Heading } from 'rebass';
import PropTypes from 'prop-types';

const ImageCard = ({ title, ...props }) => (
  <Card {...props}>
    {title && (
      <Heading as="div" fontSize={2}>
        {title}
      </Heading>
    )}
  </Card>
);

ImageCard.propTypes = {
  title: PropTypes.string,
};

ImageCard.defaultProps = {
  title: '',
  p: 3,
  mr: 2,
  borderRadius: 3,
  backgroundSize: 'cover',
};

export default ImageCard;
