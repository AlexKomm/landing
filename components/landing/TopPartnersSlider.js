import React from 'react';
import { Box, Card, Heading, Image, Text } from 'rebass';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Bold } from '../base';
import { Rating } from '../molecules';
import { Spinner, Carousel } from '../organisms';
import { getTopPartners } from '../../api/landing';
import withInnerHtml from '../../helpers/withInnerHtml';

class TopPartners extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    domain: PropTypes.shape({
      id: PropTypes.string,
      city: PropTypes.shape({
        name: PropTypes.string,
        prepositionalCase: PropTypes.string,
      }),
    }).isRequired,
  };

  static defaultProps = {
    title: '',
  };

  state = {
    isLoading: true,
    partners: [],
  };

  async componentDidMount() {
    try {
      const { data: partners } = await getTopPartners();

      this.setState({ isLoading: false, partners });
    } catch (err) {
      console.log(err);
    }
  }

  getDefaultTitle() {
    const { domain } = this.props;
    let cityPrefix = null;

    const { name: cityName, prepositionalCase: cityPrepositionalCase } = domain.city || {};

    if (cityPrepositionalCase) {
      cityPrefix = ` в ${cityPrepositionalCase}`;
    } else if (cityName) {
      cityPrefix = ` в г. ${cityName}`;
    }

    return (
      <>
        <Bold>600+ проверенных</Bold> кейтеринговых компаний и ресторанов{cityPrefix}
      </>
    );
  }

  render() {
    const { title } = this.props;
    const { partners, isLoading } = this.state;

    const titleLabel = title ? withInnerHtml(title) : this.getDefaultTitle();

    if (isLoading) {
      return <Spinner />;
    }

    return <TopPartnersSlider title={titleLabel} partners={partners} />;
  }
}

const PartnerCard = ({ image, rating, path, ...props }) => (
  <Card variant="white" borderRadius={3} p={3} {...props}>
    <Image
      src={image}
      mx="auto"
      mb={3}
      css={{ objectFit: 'contain', height: 150, filter: 'grayscale(100%)' }}
    />
    <Text textAlign="center">
      <Rating rating={rating} mr={2} />
      {rating}
    </Text>
  </Card>
);

PartnerCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
};

const TopPartnersTitle = styled(Heading)`
  .u-strong {
    font-weight: bold;
  }
`;

TopPartnersTitle.defaultProps = {
  as: 'h2',
  textAlign: 'center',
  fontSize: 5,
  fontWeight: 'normal',
  mb: 4,
  color: 'white',
};

const TopPartnersSlider = ({ partners, title, ...props }) => {
  const settings = {
    dots: false,
    infinite: partners.length > 6,
    speed: 500,
    arrows: false,
    slidesToShow: 6,
  };

  return (
    <Card variant="green" py={5} {...props}>
      <TopPartnersTitle>{title}</TopPartnersTitle>
      <Carousel {...settings}>
        {partners.map(partner => (
          <Box p={2} key={partner.uuid}>
            <PartnerCard
              id={partner.uuid}
              path={partner.path}
              image={partner.image}
              rating={parseFloat(partner.rating, 10)}
            />
          </Box>
        ))}
      </Carousel>
    </Card>
  );
};

TopPartnersSlider.propTypes = {
  partners: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      rating: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.node.isRequired,
};

export default React.memo(TopPartners);
