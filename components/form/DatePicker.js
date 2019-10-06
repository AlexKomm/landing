import React from 'react';
import { connect, getIn } from 'formik';
import { isValid } from 'date-fns';
import ru from 'date-fns/locale/ru';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import styled from 'styled-components';
import { Relative } from '../base';
import Input from './Input';
import { CalendarIcon } from '../molecules';
import '../../static/css/react-datepicker.css';

registerLocale('ru', ru);

// eslint-disable-next-line react/prefer-stateless-function
class CustomInputBase extends React.Component {
  render() {
    const { className, name, value, onClick } = this.props;

    return (
      <Relative className={className}>
        <Input type="text" name={name} defaultValue={value} onClick={onClick} />
        <CalendarIcon color="green" />
      </Relative>
    );
  }
}

const StyledCustomInput = styled(CustomInputBase)`
  ${Input} {
    padding-right: 25px;
  }

  ${CalendarIcon} {
    position: absolute;
    width: 16px;
    height: 16px;
    line-height: 16px;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
  }
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
    <ReactDatePicker
      autoComplete="off"
      name={name}
      locale="ru"
      selected={getIn(values, name) && new Date(getIn(values, name))}
      onChange={handleChange}
      onChangeRaw={handleChangeRaw}
      onBlur={handleBlur}
      customInput={<StyledCustomInput />}
      dateFormat={dateFormat}
      {...props}
    />
  );
};

export default connect(DatePicker);
