import React from 'react';
import { connect, getIn } from 'formik';
import { isValid } from 'date-fns';
import ru from 'date-fns/locale/ru';
import DatePickerBase, { registerLocale } from 'react-datepicker';
import styled from 'styled-components';
import { InputCss } from './Input';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ru', ru);

const StyledDatePicker = styled(DatePickerBase)`
  ${InputCss}
`;

const useDatePicker = (setFieldValue, setFieldTouched, name) => {
  const handleChangeRaw = value => {
    if (isValid(new Date(value))) {
      setFieldValue(name, value);
      setFieldTouched(name, true);
    }
  };

  const handleChange = date => {
    const dateInstance = new Date(date);

    if (date && isValid(dateInstance)) {
      setFieldValue(name, dateInstance);
    } else {
      setFieldValue(name, '');
    }

    setFieldTouched(name, true);
  };

  return [handleChangeRaw, handleChange];
};

const DatePicker = ({
  dateFormat = 'dd.MM.yyyy',
  formik: { values, setFieldValue, setFieldTouched, handleBlur },
  name,
  ...props
}) => {
  const [handleChangeRaw, handleChange] = useDatePicker(setFieldValue, setFieldTouched, name);

  return (
    <StyledDatePicker
      autoComplete="off"
      name={name}
      locale="ru"
      selected={getIn(values, name) && new Date(getIn(values, name))}
      onChange={handleChange}
      onChangeRaw={handleChangeRaw}
      onBlur={handleBlur}
      dateFormat={dateFormat}
      {...props}
    />
  );
};

export default connect(DatePicker);
