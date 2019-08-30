import React from 'react';
import { Heading, Text, Card, Button, Flex, Box } from 'rebass';
import PropTypes from 'prop-types';
import Numeric from './Numeric';

const FormatCard = ({
  onCreateOrderButtonClick,
  image,
  title,
  budget,
  person,
  description,
  ...props
}) => {
  return (
    <Card
      {...props}
      as="article"
      backgroundImage={`url(${image})`}
      backgroundSize="cover"
      p={3}
      color="white"
      css={{ display: 'flex', flexDirection: 'column' }}
    >
      <Flex alignItems="center" mb={3}>
        <Box width={1 / 2} px={2}>
          <Heading as="h3" flex="1 1 50%">
            {title}
          </Heading>
        </Box>
        <Text width={1 / 2} px={2} textAlign="right">
          <Numeric value={budget} suffix={' \u20bd/чел'} />
          <Numeric value={person} suffix="" />
        </Text>
      </Flex>
      <Flex alignItems="center" mt="auto">
        <Box width={1 / 2} px={2}>
          <Text flex="1 1 50%" fontSize={1}>
            {description}
          </Text>
        </Box>
        <Text width={1 / 2} px={2} textAlign="right">
          <Button onClick={onCreateOrderButtonClick} variant="secondary">
            Разместить заявку
          </Button>
        </Text>
      </Flex>
    </Card>
  );
};

FormatCard.propTypes = {
  onCreateOrderButtonClick: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  budget: PropTypes.string.isRequired,
  person: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default FormatCard;
