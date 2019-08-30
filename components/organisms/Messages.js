import styled from 'styled-components';
import { Text } from 'rebass';
import { border } from 'styled-system';

export const Error = styled(Text)(border);

Error.defaultProps = {
  textAlign: 'left',
  color: 'white',
  backgroundColor: 'error',
  py: 2,
  px: 2,
};

export default { Error };
