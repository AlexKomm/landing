import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'rebass';
import styled from 'styled-components';
import SaleOffersGallery from './SaleOffersGallery';
import SaleOffersSearchForm from './SaleOffersSearchForm';
import { Container } from '../base';
import { Spinner } from '../organisms';
import withInnerHtml from '../../helpers/withInnerHtml';

import * as saleOffersApi from '../../api/landing';

const SaleOffersTitleBase = styled(Heading)`
  .u-strong {
    font-weight: bold;
  }
`;

const SaleOffersTitle = withInnerHtml(SaleOffersTitleBase);

class SaleOffers extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    initialValues: PropTypes.object,
  };

  static defaultProps = {
    title: 'Выберите и закажите <span class="u-strong">готовое предложение</span>',
    offers: [],
    initialValues: {},
  };

  state = {
    isLoading: false,
    // eslint-disable-next-line react/destructuring-assignment
    offers: this.props.offers,
  };

  async componentDidMount() {
    const { initialValues } = this.props;
    const { offers } = this.state;

    if (!offers.length) {
      this.fetchSaleOffers(initialValues);
    }
  }

  fetchSaleOffers = values => {
    this.setState({ isLoading: true });

    return saleOffersApi
      .getSaleOffers(null, values)
      .then(
        offers => this.setState({ isLoading: false, offers }),
        () => this.setState({ isLoading: false }),
      );
  };

  onSubmit = values => this.fetchSaleOffers(values);

  render() {
    const { isLoading, offers } = this.state;
    const { initialValues, title } = this.props;

    return (
      <Container as="section" py={3}>
        <SaleOffersTitle
          as="h2"
          my={3}
          html={title}
          fontSize={5}
          fontWeight="normal"
          textAlign="center"
        />
        <SaleOffersSearchForm initialValues={initialValues} onSubmit={this.onSubmit} />
        {isLoading && <Spinner />}
        {!isLoading && offers && <SaleOffersGallery offers={offers} />}
      </Container>
    );
  }
}

export default React.memo(SaleOffers);
