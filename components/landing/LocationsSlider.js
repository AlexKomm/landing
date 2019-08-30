import React from 'react';
import { Box, Heading } from 'rebass';
import styled from 'styled-components';
import { LocationCard, LocationDetails } from '../molecules';
import { Container } from '../base';
import { Spinner, Carousel } from '../organisms';
import { getLocations } from '../../api/landing';

const LocationCardWrapper = styled(Box)`
  height: 100%;
`;

LocationCardWrapper.defaultProps = {
  p: 2,
};

const StyledLocationCard = styled(LocationCard)`
  display: flex;
  flex-direction: column;
  height: 100%;

  ${LocationDetails} {
    margin-top: auto;
  }
`;

class LocationsSlider extends React.Component {
  state = {
    isLoading: true,
    locations: [],
  };

  async componentDidMount() {
    const { data: locations } = await getLocations();

    this.setState({ isLoading: false, locations });
  }

  render() {
    const { isLoading, locations } = this.state;

    const settings = {
      dots: false,
      infinite: locations.length > 3,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
    };

    if (isLoading) {
      return <Spinner />;
    }
    if (locations.length === 0) {
      return null;
    }

    return (
      <Container my={4}>
        <Heading as="h2" textAlign="center" fontSize={5} fontWeight="normal" my={3}>
          Помогаем с подбором площадки
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
          {locations.map(location => {
            const capacity = [
              { field: 'banquet', title: 'Банкет' },
              { field: 'furshet', title: 'Фуршет' },
              { field: 'coffee-break', title: 'Кофе-брейк' },
              { field: 'conference', title: 'Конференция' },
            ].reduce((filtered, item) => {
              const fieldData = location[item.field];

              if (!fieldData || !fieldData.enabled) return filtered;

              const value = fieldData.max || fieldData.preferred;

              if (!value) return filtered;

              filtered.push({ value, ...item });

              return filtered;
            }, []);

            return (
              <LocationCardWrapper key={location.sid}>
                <StyledLocationCard
                  title={location.label || location.name}
                  image={location.image}
                  capacity={capacity}
                />
              </LocationCardWrapper>
            );
          })}
        </Carousel>
      </Container>
    );
  }
}

export default React.memo(LocationsSlider);
