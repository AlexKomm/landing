import styled from 'styled-components';
import { Box } from 'rebass';

const Slider = styled(Box)`
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;

  // Hide scrollbars
  -ms-overflow-style: none; // IE 10+
  scrollbar-width: none; // Firefox

  &::-webkit-scrollbar {
    display: none; // Safari and Chrome
  }

  & > * {
    display: inline-block;
  }
`;

export default Slider;
