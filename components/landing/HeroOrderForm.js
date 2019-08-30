import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import styled from 'styled-components';
import { Flex, Card, Text, Button } from 'rebass';
import { Select, Input, DatePicker } from '../form';
import { OrderForm, Modal } from '../organisms';

const HeroFieldWrapper = styled(Card)`
  display: flex;
  align-items: center;
`;

HeroFieldWrapper.defaultProps = {
  flex: '0 1 auto',
  p: [2, 2, 2, 3],
  bg: 'white',
  mr: [0, 0, 2],
  mb: [2, 2, 0],
  borderRadius: 1,
  fontSize: [1, 2, 2, 3],
};

const HeroFieldLabel = styled(Text)([]);

HeroFieldLabel.defaultProps = {
  as: 'label',
  mr: 2,
};

const HeroButton = styled(Button)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  font-weight: 700;
`;

HeroButton.defaultProps = {
  as: 'button',
  type: 'submit',
  variant: 'primary',
  borderRadius: 1,
  p: [2, 2, 2, 3],
  fontSize: [2, 2, 2, 3],
};

const HeroOrderFormBase = ({
  occasionsList,
  className,
  id,
  defaultOccasion,
  defaultFormat,
  defaultPersonCount,
  onFormSubmit,
  ...props
}) => {
  const occasionValues = [...occasionsList, { name: 'Другой повод', id: '_none' }];

  if (!occasionsList.length) {
    return null;
  }

  return (
    <Formik
      initialValues={{
        occasion: defaultOccasion ? defaultOccasion.tid : occasionsList[0],
        person: defaultPersonCount || '',
        format: defaultFormat ? defaultFormat.tid : '',
        date: new Date(),
      }}
      validate={values => {
        const errors = {};

        if (!values.person) {
          errors.person = 'Обязательное поле';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        onFormSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form id={id} className={className}>
          <Flex flexWrap={['wrap', 'wrap', 'nowrap']}>
            {!defaultOccasion && (
              <Field
                name="occasion"
                render={({ field }) => (
                  <HeroFieldWrapper width={['100%', '100%', 240]}>
                    <Select {...field} id={`${id}__occasion`}>
                      {occasionValues.map(occasion => (
                        <option key={occasion.id} value={occasion.id}>
                          {occasion.name}
                        </option>
                      ))}
                    </Select>
                  </HeroFieldWrapper>
                )}
              />
            )}
            <Field
              name="person"
              render={({ field }) => (
                <HeroFieldWrapper width={['100%', '100%', 190]}>
                  <HeroFieldLabel htmlFor={`${id}__person`}>Персон</HeroFieldLabel>
                  <Input
                    error={touched.person && errors.person}
                    {...field}
                    type="number"
                    min="1"
                    id={`${id}__person`}
                  />
                </HeroFieldWrapper>
              )}
            />
            <HeroFieldWrapper width={['100%', '100%', 'auto']}>
              <HeroFieldLabel htmlFor={`${id}__date`}>Дата</HeroFieldLabel>
              <DatePicker name="date" id={`${id}__date`} />
            </HeroFieldWrapper>
            <HeroButton width={['100%', '100%', 'auto']}>
              Получить
              <br />
              предложения
            </HeroButton>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

const HeroOrderForm = styled(HeroOrderFormBase)`
  color: ${props => props.theme.colors.primaryText};
`;

export default HeroOrderForm;
