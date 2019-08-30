/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import styled from 'styled-components';
import { Box, Text } from 'rebass';

const CheckboxBase = ({ field, label, className, id, ...props }) => (
  <Box className={className}>
    <input {...field} {...props} type="checkbox" id={id} />
    {label && (
      <Text as="label" fontSize={1} htmlFor={id}>
        {label()}
      </Text>
    )}
  </Box>
);

const Checkbox = styled(CheckboxBase)`
  input[type='checkbox'] {
    display: none;
  }

  input[type='checkbox'] + label {
    display: inline-block;
    position: relative;
    cursor: pointer;
    padding-left: 28px;
  }

  input[type='checkbox'] + label:before {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    border: 1px solid #c6c6c6;
    border-radius: 3px;
    background-color: #ffffff;
    width: 20px;
    height: 20px;
    content: '';
  }

  input[type='checkbox']:checked + label:before {
    background: url('/static/icons/checkbox.png') center center no-repeat #ffffff;
  }
`;

export default Checkbox;
