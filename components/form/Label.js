import { Text } from 'rebass';
import styled from 'styled-components';

const Label = styled(Text).attrs(props => ({
  inline: props.inline || false,
}))`
  display: ${props => (props.inline ? 'inline-block' : 'block')};
`;

Label.defaultProps = {
  as: 'label',
  color: 'lightgrey',
  fontSize: 1,
  mb: 2,
};

export default Label;
