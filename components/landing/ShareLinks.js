import React from 'react';
import { Heading, Text } from 'rebass';
import { Container, Link } from '../base';
import { YaShare } from '../organisms';

const ShareLinks = props => {
  return (
    <Container my={4}>
      <Heading as="h2" textAlign="center" fontSize={4} fontWeight="normal" my={3}>
        Расскажите друзьям о сервисе CaterMe.ru
      </Heading>
      <YaShare css={{ textAlign: 'center' }} mb={3} />
      <Text textAlign="center">
        или участвуйте в <Link href="/referral">реферальной программе</Link>
      </Text>
    </Container>
  );
};

export default React.memo(ShareLinks);
