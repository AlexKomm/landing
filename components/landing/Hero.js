import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Box, Card, Heading, Flex } from 'rebass';
import { Container } from '../base';
import withInnerHtml from '../../helpers/withInnerHtml';

const resolveImagePath = image =>
  `url(https://caterme.ru/sites/default/files/landing_photo/${image})`;

const HeroTitle = withInnerHtml(styled(Heading)`
  .color-gold {
    color: ${props => props.theme.colors.warning};
  }
`);

const HeroSubtitle = withInnerHtml(styled(Box)`
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  ul > li {
    padding: 0 0.7em;
    text-indent: -0.7em;
    margin-bottom: ${props => props.theme.space[2]}px;
  }

  ul > li::before {
    content: '• ';
    color: ${props => props.theme.colors.green};
  }

  ul > li > span {
    color: white;
  }
`);

const Hero = ({ image, title, subtitle, top, children }) => {
  return (
    <Card
      pt={6}
      px={[3, 4]}
      pb={0}
      backgroundImage={resolveImagePath(image)}
      backgroundSize="cover"
      backgroundPosition="center"
      color="white"
      bg="darkgray"
    >
      <Container>
        {top()}
        <HeroTitle html={title} as="div" mb={3} fontWeight="500" fontSize={[5, 6]} />
        <HeroSubtitle html={subtitle} fontSize={[2, 3]} />
        <Flex mt={4} flexDirection="column">
          {children}
        </Flex>
      </Container>
    </Card>
  );
};

Hero.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

Hero.getDefaultProps = {
  subtitle: '',
  children: null,
};

export default React.memo(Hero);
