import React from 'react';
import PropTypes from 'prop-types';
import { Card, Link, Box, Text, Button, Flex } from 'rebass';
import styled from 'styled-components';
import { Relative } from '../base/Position';
import Numeric from './Numeric';
import Rating from './Rating';
import formatPlural from '../../utils/plural';
import { offerShape } from '../../utils/propTypes';

const SaleOfferTitle = styled(Link)`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;

  font-size: 16px;
  line-height: 16px;
  font-weight: 400;

  text-align: right;

  &:hover {
    text-decoration: underline;
  }
`;

SaleOfferTitle.defaultProps = {
  as: 'a',
  color: 'white',
};

const ImageWithGradient = styled(Card)`
  position: relative;
  height: 160px;

  &:before {
    content: '';
    position: absolute;
    top: ${props => props.gradientY};
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(to top, rgba(7, 23, 32, 0.8), transparent);
  }
`;

ImageWithGradient.propTypes = {
  gradientY: PropTypes.string,
};

ImageWithGradient.defaultProps = {
  gradientY: '0',
};

const SaleOfferHeader = ({ title, photo, path }) => (
  <Relative>
    <ImageWithGradient
      gradientY="50%"
      borderRadius={3}
      backgroundImage={`url(${photo})`}
      backgroundPosition="center"
      backgroundSize="cover"
    />
    <SaleOfferTitle href={path} p={3}>
      {title}
    </SaleOfferTitle>
  </Relative>
);

SaleOfferHeader.propTypes = {
  title: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};

const SaleOfferItem = ({ offer, ...props }) => {
  return (
    <Card variant="white" borderRadius={3} {...props}>
      <SaleOfferHeader title={offer.title} photo={offer.photo} path={offer.path} />
      <Flex p={3} alignItems="center" justifyContent="space-between">
        <Box>
          <Numeric fontWeight="700" fontSize={3} value={offer.price} />
          <Rating rating={offer.rating} mr={2} />
          <Text as="span" color="lightgrey" fontSize={0}>
            {offer.feedbackCount} {formatPlural(offer.feedbackCount, 'отзыв', 'отзыва', 'отзывов')}
          </Text>
        </Box>
        <Button as="a" variant="primary" borderRadius={6} href="#foobar">
          Смотреть
        </Button>
      </Flex>
    </Card>
  );
};

SaleOfferItem.propTypes = {
  offer: PropTypes.shape(offerShape).isRequired,
};

export default SaleOfferItem;
