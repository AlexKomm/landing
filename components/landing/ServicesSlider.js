import React from 'react';
import { Card, Heading } from 'rebass';
import { Bold, Slider, Container } from '../base';
import { ImageCard } from '../molecules';

const ServiceCard = props => <ImageCard {...props} css={{ width: '151px', height: '226px' }} />;

const ServicesSlider = props => {
  return (
    <Card variant="blue" {...props} py={5}>
      <Heading as="h2" textAlign="center" fontSize={5} fontWeight="normal" mb={4} color="white">
        Нужно что то еще? - Легко! Заказывайте <Bold>любые услуги</Bold>
      </Heading>
      <Container>
        <Slider>
          <ServiceCard title="Посуда" backgroundImage="url(/static/services/Dish.png)" />
          <ServiceCard title="Аренда мебели" backgroundImage="url(/static/services/Chairs.png)" />
          <ServiceCard title="Текстиль" backgroundImage="url(/static/services/Textyle.png)" />
          <ServiceCard title="Официанты" backgroundImage="url(/static/services/Waiters.png)" />
          <ServiceCard title="Декор" backgroundImage="url(/static/services/Decor.png)" />
          <ServiceCard title="Площадки" backgroundImage="url(/static/services/Location.png)" />
          <ServiceCard title="Организация" backgroundImage="url(/static/services/Management.png)" />
          <ServiceCard title="Логистика" backgroundImage="url(/static/services/Logistics.png)" />
        </Slider>
      </Container>
    </Card>
  );
};

export default React.memo(ServicesSlider);
