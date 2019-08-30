import React from 'react';
import App, { Container } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { MediaQueryProvider } from 'react-media-query-hoc';
import modernNormalize from 'styled-modern-normalize';
import theme from '../theme';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'GothamPro';
    font-weight: 300;
    src: url('/static/fonts/GothamPro-Light/GothamPro-Light.woff') format('woff'),
         url('/static/fonts/GothamPro-Light/GothamPro-Light.ttf') format('truetype');
  }

  @font-face {
    font-family: 'GothamPro';
    font-weight: 400;
    src: url('/static/fonts/GothamPro/GothamPro.woff') format('woff'),
         url('/static/fonts/GothamPro/GothamPro.ttf') format('truetype');
  }

  @font-face {
    font-family: 'GothamPro';
    font-weight: 500;
    src: url('/static/fonts/GothamPro-Medium/GothamPro-Medium.woff') format('woff'),
         url('/static/fonts/GothamPro-Medium/GothamPro-Medium.ttf') format('truetype');
  }

  @font-face {
    font-family: 'GothamPro';
    font-weight: 700;
    src: url('/static/fonts/GothamPro-Bold/GothamPro-Bold.woff') format('woff'),
         url('/static/fonts/GothamPro-Bold/GothamPro-Bold.ttf') format('truetype');
  }

  ${modernNormalize}

  body {
    font-family: ${props => props.theme.fontFamily};
    color: ${props => props.theme.colors.primaryText};
    line-height: 1.3;
  }

  a {
    display: inline-block;
  }
`;

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <MediaQueryProvider queries={theme.mediaQueries}>
          <Container>
            <GlobalStyle />
            <Component {...pageProps} />
          </Container>
        </MediaQueryProvider>
      </ThemeProvider>
    );
  }
}

export default MyApp;
