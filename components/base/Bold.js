import styled from 'styled-components';
import { Text } from 'rebass';

const Bold = styled(Text)([]);

Bold.defaultProps = {
  as: 'span',
  fontWeight: 'bold',
};

export default Bold;
