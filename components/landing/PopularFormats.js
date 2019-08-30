import React from 'react';
import { Flex, Box, Heading } from 'rebass';
import PropTypes from 'prop-types';
import FormatCard from '../molecules/FormatCard';

const PopularFormats = ({ onCreateOrderButtonClick, formats, title, ...props }) => {
  const formatCards = formats.map(format => (
    <FormatCard
      key={format.title}
      width={1 / 2}
      image={format.image}
      title={format.title}
      budget={format.budget}
      person={format.person}
      description={format.description}
      onCreateOrderButtonClick={onCreateOrderButtonClick}
    />
  ));

  return (
    <Box {...props} as="section" my={4}>
      <Heading as="h2" textAlign="center" fontSize={5} fontWeight="normal" my={3}>
        {title}
      </Heading>
      <Flex flexWrap="wrap">{formatCards}</Flex>
    </Box>
  );
};

PopularFormats.propTypes = {
  onCreateOrderButtonClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  formats: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      title: PropTypes.string,
      budget: PropTypes.string,
      person: PropTypes.string,
      description: PropTypes.string,
    }),
  ).isRequired,
};

export default React.memo(PopularFormats);
