import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Heading } from 'rebass';
import { Container } from '../base';
import { Spinner, Carousel } from '../organisms';
import { FeedbackCard } from '../molecules';
import { getFeedbacks } from '../../api/landing';

const FeedbackCardWrapper = styled(Box)`
  height: 100%;
`;

FeedbackCardWrapper.defaultProps = {
  p: 2,
};

class FeedbackSlider extends React.Component {
  state = {
    isLoading: true,
    feedbacks: [],
  };

  async componentDidMount() {
    const { data: feedbacks } = await getFeedbacks();

    this.setState({ isLoading: false, feedbacks });
  }

  render() {
    const { isLoading, feedbacks } = this.state;

    const settings = {
      dots: false,
      infinite: feedbacks.length > 3,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };

    if (isLoading) {
      return <Spinner />;
    }
    if (feedbacks.length === 0) {
      return null;
    }

    return (
      <Container my={4}>
        <Heading as="h2" textAlign="center" fontSize={5} fontWeight="normal" my={3}>
          Отзывы клиентов
        </Heading>
        <Carousel
          {...settings}
          css={{
            '.slick-track': {
              display: 'flex',
            },
            '.slick-slide': {
              display: 'flex',
              height: 'auto',
            },
            '.slick-slide > div': {
              height: '100%',
            },
          }}
        >
          {feedbacks.map(feedback => {
            return (
              <FeedbackCardWrapper key={feedback.title}>
                <FeedbackCard
                  orderTitle={feedback.title}
                  orderPath={feedback.path}
                  feedback={feedback.comment}
                  createdAgo={feedback.created}
                  name={feedback.name}
                  ratingTotal={feedback.rating_total}
                  ratingMenu={feedback.rating_menu}
                  ratingService={feedback.rating_service}
                  ratingCommunication={feedback.rating_communication}
                  ratingQuality={feedback.rating_quality}
                />
              </FeedbackCardWrapper>
            );
          })}
        </Carousel>
      </Container>
    );
  }
}

export default React.memo(FeedbackSlider);
