import React from 'react';
import { Card, Box, Heading } from 'rebass';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Bold } from '../base';
import withInnerHtml from '../../helpers/withInnerHtml';

const CardImage = withInnerHtml(styled(Box)`
  position: relative;
  display: block;

  > img {
    object-fit: cover;
    max-width: 100%;
    max-height: 200px;

    border-top-left-radius: ${props => props.theme.radii[3]}px;
    border-top-right-radius: ${props => props.theme.radii[3]}px;
  }
`);

const CapacityList = styled(Box)`
  margin: 0;

  &:after {
    display: table;
    content: '';
    clear: both;
  }

  dt,
  dd {
    float: left;
  }

  dt {
    clear: left;
    margin-right: 5px;
  }

  dt:after {
    content: ':';
  }

  dd {
    margin-left: 0;
  }
`;

CapacityList.defaultProps = {
  as: 'dl',
};

const StyledCard = styled(Card)([]);

StyledCard.defaultProps = {
  variant: 'white',
  borderRadius: 3,
};

export const LocationDetails = styled(Box)([]);

LocationDetails.defaultProps = {
  p: 3,
};

const LocationCard = ({ title, image, capacity = [], ...props }) => {
  const capacityList = capacity.map(item => (
    <React.Fragment key={item.field}>
      <dt>{item.title}</dt>
      <dd>
        <Bold>{item.value}</Bold> чел.
      </dd>
    </React.Fragment>
  ));

  return (
    <StyledCard {...props}>
      <CardImage html={image} />
      <Heading as="h3" p={3} fontSize={2} mb={2}>
        {title}
      </Heading>
      <LocationDetails>
        {capacityList && <CapacityList>{capacityList}</CapacityList>}
      </LocationDetails>
    </StyledCard>
  );
};

LocationCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  capacity: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      title: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
};

LocationCard.defaultProps = {
  capacity: [],
};

export default LocationCard;
