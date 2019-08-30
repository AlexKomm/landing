import React from 'react';
import { Text } from 'rebass';
import styled from 'styled-components';
import withInnerHtml from '../../helpers/withInnerHtml';

const StyledBody = styled(Text)`
  & a {
    text-decoration: none;
    color: ${props => props.theme.colors.green};
  }
`;

const Body = withInnerHtml(StyledBody);

export default React.memo(Body);
