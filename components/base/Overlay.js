import React from 'react';
import styled from 'styled-components';
import { Text } from 'rebass';
import PropTypes from 'prop-types';
import { Fixed, Absolute } from './Position';
import { Spinner } from '../organisms';

const OverlayBase = ({ withSpinner, text, children, ...props }) => {
  return (
    <Fixed {...props}>
      <Absolute>
        {withSpinner && <Spinner />}
        {text && <Text color="white">{text}</Text>}
      </Absolute>
      {children}
    </Fixed>
  );
};

OverlayBase.propTypes = {
  withSpinner: PropTypes.bool,
  text: PropTypes.node,
  children: PropTypes.node,
};

OverlayBase.defaultProps = {
  withSpinner: false,
  text: null,
  children: null,
};

const Overlay = styled(OverlayBase)`
  overflow-y: scroll;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: ${props => props.theme.colors.overlayBg};
  width: 100%;
  height: 100%;

  ${Absolute} {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default Overlay;
