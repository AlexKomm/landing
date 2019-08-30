import React from 'react';
import { MdClose, MdExpandMore, MdExpandLess, MdMenu } from 'react-icons/md';
import { FaRegHeart, FaInstagram, FaVk, FaFacebookF } from 'react-icons/fa';
import styled from 'styled-components';
import { layout, system, position, space } from 'styled-system';

const svgColor = system({
  color: {
    property: 'fill',
    scale: 'colors',
  },
});

const SvgIconBase = ({
  width = '32',
  height = '32',
  title = 'Svg Icon',
  children,
  viewBox = '0 0 32 32',
  ...props
}) => (
  <svg {...props} width={width} height={height} viewBox={viewBox}>
    <title>{title}</title>
    {children}
  </svg>
);

const withIconProps = WrappedComponent => {
  return styled(WrappedComponent)`
    cursor: pointer;
    vertical-align: middle;

    ${svgColor}
    ${layout}
    ${position}
    ${space}
  `;
};

export const SvgIcon = withIconProps(SvgIconBase);

export const Close = withIconProps(MdClose);
export const ExpandMore = withIconProps(MdExpandMore);
export const ExpandLess = withIconProps(MdExpandLess);
export const MenuIcon = withIconProps(MdMenu);
export const HeartIcon = withIconProps(FaRegHeart);

export const InstagramIcon = withIconProps(FaInstagram);
export const VkIcon = withIconProps(FaVk);
export const FbIcon = withIconProps(FaFacebookF);

export const UserIconPlaceholder = props => (
  <SvgIcon {...props} viewBox="0 0 1792 1792" title="User icon placeholder">
    <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z" />
  </SvgIcon>
);

export default {
  Close,
  ExpandMore,
  ExpandLess,
  SvgIcon,
  UserIconPlaceholder,
  HeartIcon,
  InstagramIcon,
  VkIcon,
  FbIcon,
};
