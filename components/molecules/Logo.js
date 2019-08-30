import { Image, Text } from 'rebass';
import React from 'react';
import styled from 'styled-components';
import { Link } from '../base';

const LogoBase = ({ logo, ...props }) => (
  <Link {...props} href="/">
    <Image src={logo} alt="Логотип компании Caterme" />
    <Text>Главная</Text>
  </Link>
);

LogoBase.defaultProps = {
  logo: '/static/caterme-logo.svg',
};

const Logo = styled(LogoBase)`
  ${Text} {
    height: 0;
    overflow: hidden;
    text-indent: 120%;
  }
`;

export default Logo;
