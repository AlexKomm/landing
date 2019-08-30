import React from 'react';
import PropTypes from 'prop-types';
import SaleOffersGallery from './SaleOffersGallery';
import SaleOffersSearchForm from './SaleOffersSearchForm';

import { Container } from '../base';
import { Spinner } from '../organisms';

import * as saleOffersApi from '../../api/landing';

class SaleOffers extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    initialValues: PropTypes.object,
  };

  static defaultProps = {
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
    const { initialValues } = this.props;

    return (
      <Container>
        <SaleOffersSearchForm initialValues={initialValues} onSubmit={this.onSubmit} />
        {isLoading && <Spinner />}
        {!isLoading && offers && <SaleOffersGallery offers={offers} />}
      </Container>
    );
  }
}

export default React.memo(SaleOffers);
