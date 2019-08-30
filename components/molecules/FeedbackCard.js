import React from 'react';
import { Card, Link, Text, Flex } from 'rebass';
import styled from 'styled-components';
import Rating from './Rating';

const FeedbackTitle = styled(Link)`
  text-decoration: none;
  font-weight: 500;
`;

FeedbackTitle.defaultProps = {
  color: 'green',
};

const GradeList = ({ grades, className, ...props }) => {
  return (
    <dl className={className}>
      {grades.map(grade => (
        <React.Fragment key={grade.title}>
          <dt>{grade.title}</dt>
          <dd>{grade.value.toString()}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
};

const StyledGradeList = styled(GradeList)`
  dt,
  dd {
    margin: 0;
    display: inline-block;
  }

  dd {
    margin: 0 5px;
  }

  color: ${props => props.theme.colors.grey};
  font-size: ${props => props.theme.fontSizes[0]}px;
`;

const FeedbackComment = styled(Text)([]);

const FeedbackAgo = styled(Text)([]);

const FeedbackName = styled(Text)`
  &:before {
    content: ' -';
  }
`;

const FeedbackBody = styled(Flex)`
  ${FeedbackName} {
    margin-top: auto;
  }
`;

FeedbackBody.defaultProps = {
  flex: 1,
  flexDirection: 'column',
  backgroundColor: 'white',
  p: 2,
  borderRadius: 2,
  fontSize: 1,
};

const FeedbackCard = ({
  orderTitle,
  orderPath,
  feedback,
  createdAgo,
  name,
  ratingTotal,
  ratingMenu,
  ratingQuality,
  ratingService,
  ratingCommunication,
  ...props
}) => {
  const grades = [
    { title: 'Обслуживание', value: parseFloat(ratingService, 10) },
    { title: 'Ассортимент', value: parseFloat(ratingMenu, 10) },
    { title: 'Качество блюд', value: parseFloat(ratingQuality, 10) },
    { title: 'Коммуникация', value: parseFloat(ratingCommunication, 10) },
  ];

  return (
    <Card
      {...props}
      variant="beige"
      padding={3}
      borderRadius={3}
      css={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <FeedbackTitle href={orderPath}>{orderTitle}</FeedbackTitle>
      <Rating rating={parseFloat(ratingTotal, 10)} showNumeric />
      <StyledGradeList grades={grades} />
      <FeedbackBody>
        <FeedbackComment mb={3}>{feedback}</FeedbackComment>
        <FeedbackName color="grey">{name}</FeedbackName>
        <FeedbackAgo color="grey">{createdAgo}</FeedbackAgo>
      </FeedbackBody>
    </Card>
  );
};

export default FeedbackCard;
