import React from 'react';

import { Box } from 'rebass';
import PropTypes from 'prop-types';
import { Carousel, Error } from '../organisms';
import { SaleOfferItem } from '../molecules';
import { offerShape } from '../../utils/propTypes';

const SaleOffersGallery = ({ offers }) => {
  const settings = {
    dots: false,
    infinite: offers.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  if (offers.length === 0) {
    return <Error>Ничего не нашлось :(</Error>;
  }

  return (
    <Carousel {...settings}>
      {offers.map(offer => (
        <Box p={2} key={offer.nid}>
          <SaleOfferItem key={offer.nid} offer={offer} />
        </Box>
      ))}
    </Carousel>
  );
};

SaleOffersGallery.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape(offerShape)).isRequired,
};

export default SaleOffersGallery;
