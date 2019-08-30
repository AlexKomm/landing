import React from 'react';
import { Flex, Image, Box } from 'rebass';

const ClientLogos = () => {
  const logos = ['lmd', 'qiwi', 'al', 'stk', 'ykh', 'rgs'].map(name => (
    <Box
      width={[1 / 2, 1 / 3, 1 / 6]}
      p={[4, 4, 3, 4]}
      css={{
        opacity: 0.75,
      }}
      alignSelf="flex-end"
      key={name}
    >
      <Image src={`/static/logos/${name}.png`} />
    </Box>
  ));

  return (
    <Flex flexWrap="wrap" flexDirection="row" alignItems="center" justifyContent="space-between">
      {logos}
    </Flex>
  );
};

export default ClientLogos;
