import React, { useState } from 'react';
import styled from 'styled-components';
import { Heading, Flex, Box, Button, Text } from 'rebass';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { format as formatDate } from 'date-fns';
import { Error } from './Messages';
import { Label, Input, Select, DatePicker, Checkbox } from '../form';
import { createOrder } from '../../api/order';
import { Overlay, Link } from '../base';
import withCurrentUser from '../../helpers/withCurrentUser';

const FormError = ({ name, ...props }) => (
  <ErrorMessage name={name} render={msg => <Error {...props}>{msg}</Error>} />
);

const AcceptText = props => (
  <Text color="grey" {...props}>
    Я согласен с обработкой моих персональных данных в соответствии с&nbsp;
    <Link href="/privacy" target="_blank">
      политикой конфиденциальности
    </Link>
  </Text>
);

const OrderFormBase = ({
  className,
  occasionsList,
  heroValues = {},
  withCatalogButton,
  currentUser,
}) => {
  const withHeroFields = !Object.keys(heroValues).length;

  const [heroFields, toggleHeroFields] = useState(withHeroFields);

  const occasionValues = [...occasionsList, { name: 'Другой повод', id: '_none' }];

  const isManager =
    currentUser &&
    (currentUser.roles.indexOf('manager') >= 0 || currentUser.roles.indexOf('administrator') >= 0);

  return (
    <Formik
      initialValues={Object.assign(
        {},
        {
          credentialsRequired: isManager || !currentUser,
          occasion: '',
          person: '',
          date: new Date(),
          email: '',
          name: '',
          phone: '',
          accept: !!currentUser,
        },
        heroValues,
      )}
      validationSchema={Yup.object().shape({
        person: Yup.number()
          .min(1)
          .required('Укажите количество персон'),
        email: Yup.string().when('credentialsRequired', {
          is: true,
          then: Yup.string().required('Укажите ваше имя для удобства связи с вами'),
          otherwise: Yup.string().notRequired(),
        }),
        name: Yup.string().when('credentialsRequired', {
          is: true,
          then: Yup.string().required('Укажите ваше имя для удобства связи с вами'),
          otherwise: Yup.string().notRequired(),
        }),
        phone: Yup.string().when('credentialsRequired', {
          is: true,
          then: Yup.string().required('Укажите номер телефона для получения предложений по заявке'),
          otherwise: Yup.string().notRequired(),
        }),
      })}
      onSubmit={(values, { setSubmitting }) => {
        createOrder(values)
          .then(data => {
            if (data.url) {
              window.location.href = data.url;
            } else {
              setSubmitting(false);
            }
          })
          .catch(err => {
            setSubmitting(false);
            console.error(err);
          });
      }}
    >
      {({ touched, values, errors, validateForm, setFieldTouched, isSubmitting }) => {
        const catalogLink = () => {
          let link = '/offers';
          const query = [];

          // eslint-disable-next-line prefer-const
          let { person, format, occasion, date } = values;

          if (person) {
            query.push(`person=${person}`);
          }

          if (occasion) {
            const [isSaleOffer, occasionFormat] = occasionValues.reduce((result, occasionItem) => {
              if (parseInt(occasionItem.id, 10) === parseInt(occasion, 10)) {
                return [occasionItem.isSaleOffer, occasionItem.defaultFormat];
              }
              return result;
            }, []);

            if (occasionFormat) {
              format = occasionFormat;
            }

            if (!isSaleOffer) {
              occasion = null;
            }
          }

          if (format) {
            query.push(`format=${format}`);
          }

          if (occasion) {
            query.push(`event_occasion_select=${occasion}`);
          }

          if (date) {
            query.push(`event_date[date]=${formatDate(date, 'yyyy-MM-dd')}`);
          }

          if (query.length > 0) {
            link += `?${query.join('&')}`;
          }

          return link;
        };

        return (
          <>
            {isSubmitting && <Overlay withSpinner text="Пожалуйста, подождите..." />}
            <Flex className={className} alignItems="center">
              <Box width={withCatalogButton ? 1 / 2 : '100%'}>
                <Heading textAlign="center" mb={3}>
                  Получить предложения и выбрать лучшее
                </Heading>
                <Form id="orderForm">
                  {heroFields ? (
                    <>
                      <Box mb={2}>
                        <Label htmlFor="orderForm__occasion">Повод мероприятия</Label>
                        <Field id="orderForm__occasion" name="occasion" component={Select}>
                          {occasionValues.map(occasion => (
                            <option key={occasion.id} value={occasion.id}>
                              {occasion.name}
                            </option>
                          ))}
                        </Field>
                      </Box>
                      <Box mb={2}>
                        <Label htmlFor="orderForm__person">Количество персон</Label>
                        <Field
                          id="orderForm__person"
                          name="person"
                          component={Input}
                          type="number"
                          min="1"
                          error={touched.person && errors.person}
                        />
                        <FormError mt={2} name="person" />
                      </Box>
                      <Box mb={2}>
                        <Label htmlFor="orderForm__date">Дата мероприятия</Label>
                        <DatePicker id="orderForm__date" name="date" />
                      </Box>
                      <Text textAlign="center" mt={3}>
                        <Button
                          onClick={e => {
                            e.preventDefault();
                            setFieldTouched('person', true, false);
                            validateForm().then(err => {
                              if (!err.person) {
                                toggleHeroFields(false);
                              }
                            });
                          }}
                          type="button"
                          variant="primary"
                          py={3}
                        >
                          Получить предложения
                        </Button>
                      </Text>
                    </>
                  ) : (
                    <>
                      {(!currentUser || isManager) && (
                        <>
                          <Box mb={3}>
                            <Label htmlFor="orderForm__email">Email</Label>
                            <Field
                              component={Input}
                              name="email"
                              id="orderForm__email"
                              type="email"
                              error={touched.email && errors.email}
                            />
                            <FormError mt={2} name="email" />
                          </Box>
                          <Box mb={3}>
                            <Label htmlFor="orderForm__name">Ваше имя</Label>
                            <Field
                              component={Input}
                              name="name"
                              id="orderForm__name"
                              error={touched.name && errors.name}
                            />
                            <FormError mt={2} name="name" />
                          </Box>
                          <Box mb={3}>
                            <Label htmlFor="orderForm__phone">Номер телефона</Label>
                            <Field
                              component={Input}
                              name="phone"
                              type="tel"
                              id="orderForm__phone"
                              error={touched.phone && errors.phone}
                            />
                            <FormError mt={2} name="phone" />
                          </Box>
                          <Box>
                            <Field
                              component={Checkbox}
                              label={AcceptText}
                              name="accept"
                              type="checkbox"
                              value={1}
                              id="orderForm__accept"
                            />
                          </Box>
                        </>
                      )}
                      <Text textAlign="center" mt={3}>
                        <Button
                          disabled={!values.accept}
                          type="submit"
                          variant="primary"
                          py={3}
                          borderRadius={6}
                        >
                          Далее
                        </Button>
                      </Text>
                    </>
                  )}
                </Form>
              </Box>
              {withCatalogButton && (
                <Text width={[1 / 2]} textAlign="center">
                  или
                  <Box my={3}>
                    <Button
                      as="a"
                      href={catalogLink()}
                      variant="orangeGradient"
                      py={3}
                      borderRadius={6}
                    >
                      Выбрать в каталоге
                    </Button>
                  </Box>
                  Выберите одно из 2500+ готовых вариантов от 500+ кейтеринговых компаний и
                  ресторанов
                </Text>
              )}
            </Flex>
          </>
        );
      }}
    </Formik>
  );
};

const OrderForm = styled(OrderFormBase).attrs(props => ({
  withCatalogButton: props.withCatalogButton || false,
}))`
  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    display: block;
  }
`;

export default React.memo(withCurrentUser(OrderForm));
