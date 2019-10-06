import React from 'react';
import styled, { css } from 'styled-components';
import { space } from 'styled-system';

export const InputCss = css`
  outline: none;
  border: 1px solid ${props => props.theme.colors.lightgrey};
  border-radius: ${props => props.theme.radii[1]}px;
  background-color: ${props => props.theme.colors.white};
  padding: 0.8em;
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 3px -moz-mac-focusring;
  }

  &::placeholder {
    color: ${props => props.theme.colors.lightgrey};
  }

  &::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: ${props => props.theme.colors.lightgrey};
  }
  &::-moz-placeholder {
    /* Firefox 19+ */
    color: ${props => props.theme.colors.lightgrey};
  }
  &:-ms-input-placeholder {
    /* IE 10+ */
    color: ${props => props.theme.colors.lightgrey};
  }
  &:-moz-placeholder {
    /* Firefox 18- */
    color: ${props => props.theme.colors.lightgrey};
  }

  ${props =>
    props.error &&
    `
    border: 1px solid ${props.theme.colors.error};
  `}
`;

const InputBase = ({ field, icon, ...props }) => <input {...field} icon={icon} {...props} />;

const Input = styled(InputBase).attrs(props => ({
  error: props.error || null,
}))`
  ${InputCss}
  ${space}
`;

export default Input;
