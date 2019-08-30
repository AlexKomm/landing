import React from 'react';
import { Flex, Box, Heading, Text, Image } from 'rebass';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StepsList = styled(Flex)({
  listStyle: 'none',
  counterReset: 'steps-counter',
});

StepsList.defaultProps = {
  as: 'ul',
};

const StepsItem = ({ title, icon, children, ...props }) => (
  <Text
    as="li"
    width={1 / 3}
    textAlign="center"
    p={3}
    css={{
      '&:before': {
        display: 'block',
        color: '#bee1c6',
        font: '700 1.125rem GothamPro',
        content: 'counter(steps-counter)',
        'counter-increment': 'steps-counter',
        marginBottom: '1em',
      },
    }}
    {...props}
  >
    <Heading as="h3" mb={3}>
      {title}
    </Heading>
    <Text mb={3} fontSize={2} fontWeight="300">
      {children}
    </Text>
    <Image src={icon} mb={3} />
  </Text>
);

StepsItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  children: PropTypes.node,
};

StepsItem.defaultProps = {
  children: null,
};

const Steps = ({ title, ...props }) => (
  <Box {...props} my={4}>
    <Heading as="h2" textAlign="center" fontSize={5} fontWeight="normal" my={3}>
      {title}
    </Heading>
    <StepsList>
      <StepsItem title="Разместите заявку" icon="/static/steps/order.svg">
        Укажите формат, количество людей, примерный бюджет, место и дату. Займет всего 2 минуты.
      </StepsItem>
      <StepsItem title="Сравните и выберите" icon="/static/steps/offers.svg">
        До 7 индивидуальных предложений за 30 минут. Легко сравнить и выбрать понравившееся.
      </StepsItem>
      <StepsItem title="Ваши гости сыты и довольны" icon="/static/steps/foods.svg">
        Отлично проведите время с близкими, коллегами и друзьями. Сытые и довольные гости - лучший
        результат мероприятия.
      </StepsItem>
    </StepsList>
  </Box>
);

Steps.propTypes = {
  title: PropTypes.string.isRequired,
};

export default React.memo(Steps);
