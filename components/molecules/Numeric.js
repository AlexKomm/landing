import { Text } from 'rebass';
import React from 'react';
import { numberFormat } from '../../utils/numbers';

const Numeric = ({ value, suffix, ...props }) => (
  <Text {...props} css={{ whiteSpace: 'nowrap' }}>
    {numberFormat(value)}
    {suffix}
  </Text>
);

Numeric.defaultProps = {
  suffix: ' \u20bd',
};

export default Numeric;
