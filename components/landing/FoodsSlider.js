import React from 'react';
import PropTypes from 'prop-types';
import { Card, Heading } from 'rebass';
import { Bold, Slider } from '../base';
import { ImageCard } from '../molecules';

const FoodsSlider = ({ foods, ...props }) => {
  const cards = foods.map(food => (
    <ImageCard
      key={food.title}
      css={{ width: '230px', height: '175px' }}
      backgroundImage={`url(${food.image})`}
      title={food.title}
    />
  ));

  return (
    <Card variant="orange" {...props} py={5}>
      <Heading as="h2" textAlign="center" fontSize={5} fontWeight="normal" mb={4} color="white">
        <Bold>40 000+ блюд</Bold> на любой вкус и бюджет
      </Heading>
      <Slider>{cards}</Slider>
    </Card>
  );
};

FoodsSlider.propTypes = {
  foods: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
};

export default React.memo(FoodsSlider);
