import { Link } from 'rebass';
import { variant } from 'styled-system';
import styled from 'styled-components';

const linkVariants = variant({
  // theme key for variant definitions
  scale: 'linkStyles',
  // component prop
  prop: 'variant',
});

const StyledLink = styled(Link)`
  text-decoration: none;

  transition-property: all;
  transition-duration: 0.25s;
  transition-timing-function: ease-in;

  ${linkVariants}
`;

StyledLink.defaultProps = {
  as: 'a',
  color: 'green',
  variant: 'default',
};

export default StyledLink;
