import React from 'react';
import { Image } from 'rebass';
import { layout } from 'styled-system';
import styled from 'styled-components';
import { UserIconPlaceholder } from './Icons';

const UserIcon = ({ icon, ...props }) => {
  if (icon) {
    return <Image src={icon} {...props} />;
  }

  return <UserIconPlaceholder {...props} />;
};

UserIcon.defaultProps = {
  width: 40,
  height: 40,
  color: 'green',
  borderRadius: '50%',
};

export default UserIcon;
