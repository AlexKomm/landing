/* eslint-disable react/default-props-match-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Heading, Box } from 'rebass';
import styled from 'styled-components';

const CardsWrapper = styled(Box)`
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;

  & > * {
    display: inline-block;
  }
`;

const CardsSlider = ({ titleString, titleRender, children, ...props }) => (
  <Card {...props}>
    {titleString && <Heading as="h2">{titleString}</Heading>}
    {titleRender && titleRender()}
    <CardsWrapper>{children}</CardsWrapper>
  </Card>
);

CardsSlider.propTypes = {
  titleString: PropTypes.string,
  titleRender: PropTypes.func,
  children: PropTypes.node,
};

CardsSlider.defaultProps = {
  titleString: '',
  titleRender: null,
  children: null,
  py: 4,
};

export default CardsSlider;
