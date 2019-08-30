import React from 'react';
import PropTypes from 'prop-types';
import { Text, Box } from 'rebass';
import styled from 'styled-components';
import { Relative, Absolute } from '../base/Position';

const DefaultStar = props => <Text {...props}>★</Text>;

DefaultStar.defaultProps = {
  as: 'span',
  fontSize: 2,
  color: '#c5c5c5',
};

const FilledStar = styled(DefaultStar)([]);

FilledStar.defaultProps = {
  color: 'warning',
};

export const NumericLabel = styled(Text)({
  fontWeight: 'bold',
});

NumericLabel.defaultProps = {
  ml: 1,
  as: 'span',
};

const Rating = ({ rating, showNumeric, ...props }) => (
  <Relative
    {...props}
    css={{
      display: 'inline-block',
      cursor: 'default',
      'unicode-bidi': 'bidi-override',
    }}
  >
    <Absolute
      p={0}
      zIndex="1"
      top="0"
      left="0"
      css={{
        overflow: 'hidden',
        width: `${Math.round((rating / 5) * 100)}%`,
      }}
    >
      <FilledStar />
      <FilledStar />
      <FilledStar />
      <FilledStar />
      <FilledStar />
    </Absolute>
    <Box p={0} css={{ display: 'inline-block', zIndex: 0 }}>
      <DefaultStar />
      <DefaultStar />
      <DefaultStar />
      <DefaultStar />
      <DefaultStar />
    </Box>
    {showNumeric && <NumericLabel as="span">{rating.toString()}</NumericLabel>}
  </Relative>
);

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default Rating;
