import React from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';
import { Card } from 'rebass';
import { CurrentUserContext } from '../helpers/withCurrentUser';
import {
  Hero,
  ClientLogos,
  Stats,
  SaleOffers,
  Steps,
  FoodsSlider,
  ServicesSlider,
  PopularFormats,
  LocationsSlider,
  TopPartnersSlider,
  FeedbackSlider,
  Body,
  ShareLinks,
  HeroOrderForm,
} from '../components/landing';

import { Header, FooterNav, Modal, OrderForm } from '../components/organisms';

import { Container } from '../components/base';

import * as landingApi from '../api/landing';
import { pageShape } from '../utils/propTypes';

class HomePage extends React.Component {
  state = {
    heroValues: {},
    openModalForm: false,
  };

  static async getInitialProps(ctx) {
    let initialProps = {
      page: {},
      domain: { id: 'default' },
      statusCode: 404,
    };

    if (ctx && ctx.res) {
      // Set ttl for 1 day by default for landing pages
      ctx.res.set('Cache-Control', 'max-age=86400, public');
    }

    // let token = null;

    // if (req) {
    //   const { serverRuntimeConfig } = getConfig();

    //   // eslint-disable-next-line prefer-destructuring
    //   token = req.session.token;

    //   if (!token) {
    //     try {
    //       const tokenData = await getToken(
    //         serverRuntimeConfig.clientId,
    //         serverRuntimeConfig.clientSecret,
    //       );

    //       const { access_token: accessToken } = tokenData;

    //       if (accessToken) {
    //         token = accessToken;

    //         req.session.token = token;
    //       }
    //     } catch (e) {
    //       console.error(e);
    //     }
    //   }
    // }

    try {
      const pageData = await landingApi.getPage(ctx);

      initialProps = { ...initialProps, ...pageData };
    } catch (e) {
      console.error(e);
    }

    return initialProps;
  }

  render() {
    const {
      statusCode,
      page,
      domain,
      publicOccasions,
      currentUser,
      navTree,
      mainNav,
      saleOffers,
    } = this.props;

    const { openModalForm, heroValues } = this.state;

    if (statusCode !== 200) {
      return <Error statusCode={statusCode} />;
    }

    const withCatalogButton = heroValues.person && heroValues.person < 15;

    const onCreateOrderButtonClick = () => {
      this.setState({ heroValues: {}, openModalForm: true });
    };

    return (
      <CurrentUserContext.Provider value={currentUser}>
        <Header mainNav={mainNav} onCreateOrderButtonClick={onCreateOrderButtonClick} />
        <Hero image={page.heroImage} title={page.heroTitle} subtitle={page.heroSubtitle}>
          <HeroOrderForm
            id="heroOrderForm"
            occasionsList={publicOccasions}
            defaultOccasion={page.defaultOccasion}
            defaultPersonCount={page.defaultPersonCount}
            defaultFormat={page.defaultFormat}
            onFormSubmit={values => {
              this.setState({ heroValues: values, openModalForm: true });
            }}
          />
          <ClientLogos />
        </Hero>
        <Stats />
        <SaleOffers
          offers={saleOffers}
          initialValues={{ city: domain.city ? domain.city.name : 'Москва' }}
        />
        {page.formats && (
          <PopularFormats
            onCreateOrderButtonClick={onCreateOrderButtonClick}
            formats={page.formats}
            title={page.formatsTitle}
          />
        )}
        <Steps title={page.stepsTitle} />
        {page.foods && <FoodsSlider foods={page.foods} />}
        <ServicesSlider foods={page.foods} />
        <LocationsSlider />
        <TopPartnersSlider domain={domain} />
        <FeedbackSlider />
        <Container>
          <Body html={page.body} />
        </Container>
        <ShareLinks />
        <Card as="footer" variant="green" pt={5}>
          <FooterNav tree={navTree} />
        </Card>
        <Modal
          width={withCatalogButton ? 1200 : 500}
          mt={6}
          mb={5}
          mx="auto"
          open={openModalForm}
          onClose={() => this.setState({ openModalForm: false })}
        >
          <OrderForm
            occasionsList={publicOccasions}
            heroValues={heroValues}
            withCatalogButton={withCatalogButton}
          />
        </Modal>
      </CurrentUserContext.Provider>
    );
  }
}

HomePage.propTypes = {
  page: PropTypes.shape(pageShape).isRequired,
  statusCode: PropTypes.number.isRequired,
  domain: PropTypes.shape({
    id: PropTypes.string,
    city: PropTypes.object,
    region: PropTypes.object,
    format: PropTypes.object,
    service: PropTypes.object,
  }).isRequired,
};

export default HomePage;
