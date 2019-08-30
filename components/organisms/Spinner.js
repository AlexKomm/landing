import React from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';
import { layout, color as colorSystem, system } from 'styled-system';
import PropTypes from 'prop-types';

const Svg = styled.svg`
  ${system({
    stroke: {
      property: 'stroke',
      scale: 'colors',
    },
    width: {
      property: 'width',
      scale: 'space',
    },
    height: {
      property: 'height',
      scale: 'space',
    },
  })}
`;

const PuffAnimation = ({ width, height, color, label }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 44 44"
    xmlns="http://www.w3.org/2000/svg"
    stroke={color}
    aria-label={label}
  >
    <g fill="none" fillRule="evenodd" strokeWidth="2">
      <circle cx="22" cy="22" r="1">
        <animate
          attributeName="r"
          begin="0s"
          dur="1.8s"
          values="1; 20"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.165, 0.84, 0.44, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="strokeOpacity"
          begin="0s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.3, 0.61, 0.355, 1"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="22" cy="22" r="1">
        <animate
          attributeName="r"
          begin="-0.9s"
          dur="1.8s"
          values="1; 20"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.165, 0.84, 0.44, 1"
          repeatCount="indefinite"
        />
        <animate
          attributeName="strokeOpacity"
          begin="-0.9s"
          dur="1.8s"
          values="1; 0"
          calcMode="spline"
          keyTimes="0; 1"
          keySplines="0.3, 0.61, 0.355, 1"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </Svg>
);

PuffAnimation.propTypes = {
  label: PropTypes.string,
  ...layout.propTypes,
  ...colorSystem.propTypes,
};

PuffAnimation.defaultProps = {
  label: '',
};

const Spinner = ({ width, height, color, ...props }) => (
  <Box {...props} css={{ textAlign: 'center' }}>
    <PuffAnimation width={width} height={height} color={color} />
  </Box>
);

Spinner.propTypes = {
  ...layout.propTypes,
  ...colorSystem.propTypes,
};

const StyledSpinner = styled(Spinner)({
  textAlign: 'center',
});

StyledSpinner.defaultProps = {
  py: 3,
  width: 80,
  color: 'green',
};

export default StyledSpinner;
