import React from 'react';
import PropTypes from 'prop-types';
import Error from 'next/error';
import Head from 'next/head';
import { Text, Card } from 'rebass';
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
  LandingEdit,
} from '../components/landing';

import {
  Header,
  FooterNav,
  Modal,
  OrderForm,
  Breadcrumbs,
  withFooterMenuTrail,
} from '../components/organisms';

import { Container } from '../components/base';

import * as landingApi from '../api/landing';
import { pageShape } from '../utils/propTypes';

const getCurrentPath = ctx => {
  let { query: { path } = {} } = ctx || {};

  if (!path) {
    path = window.location.pathname;
  }

  if (path.indexOf('/') !== 0) {
    path = `/${path}`;
  }

  return path;
};

class HomePage extends React.Component {
  state = {
    heroValues: {},
    openModalForm: false,
  };

  static async getInitialProps(ctx) {
    let initialProps = {
      page: {},
      currentPath: getCurrentPath(ctx),
      domain: { id: 'default' },
      statusCode: 404,
      mainNav: [],
      footerMenu: [],
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
      const pageData = await landingApi.getPage(ctx, getCurrentPath(ctx));

      initialProps = { ...initialProps, ...pageData };
    } catch (e) {
      console.error(e.message);
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
      mainNav,
      footerMenu,
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
        <Head>
          {page.meta.map(metaItem => {
            const TagName = metaItem.tag;
            return <TagName key={JSON.stringify(metaItem.attributes)} {...metaItem.attributes} />;
          })}
        </Head>

        <Header mainNav={mainNav} onCreateOrderButtonClick={onCreateOrderButtonClick} />
        <Hero
          top={() => (
            <>
              {page.breadcrumbs && <Breadcrumbs mb={3} links={page.breadcrumbs} />}
              <Text mb={3} as="h1" fontSize={0}>
                {page.title}
              </Text>
              <LandingEdit mb={4} page={page} />
            </>
          )}
          image={page.heroImage}
          title={page.heroTitle}
          subtitle={page.heroSubtitle}
        >
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
        <SaleOffers initialValues={{ city: domain.city ? domain.city.name : 'Москва' }} />
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
          <FooterNav tree={footerMenu} />
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
