import React from 'react';
import { Text, Flex, Card } from 'rebass';
import { Container, Bold } from '../base';

const StatItem = ({ count, children, props }) => (
  <Text {...props} mx={3} flex="1 1 auto" textAlign="center" color="white">
    <Text fontSize={[5, 6, 7]} css={{ 'white-space': 'nowrap' }}>
      {count}
    </Text>
    <Text fontSize={[1, 2]}>{children}</Text>
  </Text>
);

const Row = props => <Flex {...props} mx={[-3]} />;

const Stats = props => {
  return (
    <Card {...props} variant="blue" py={4}>
      <Container css={{ overflow: 'hidden' }}>
        <Row>
          <StatItem count="600+">
            Кейтеринговых <Bold as="span">компаний</Bold>
            <br /> и ресторанов
          </StatItem>
          <StatItem count="40 000+">
            <Bold as="span">Блюд</Bold> в каталогах
            <br /> партнеров
          </StatItem>
          <StatItem count="20 000+">
            Счастливых <Bold as="span">клиентов</Bold>
            <br />
            CaterMe
          </StatItem>
        </Row>
      </Container>
    </Card>
  );
};

export default React.memo(Stats);
