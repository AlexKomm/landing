import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Box, Flex, Text } from 'rebass';
import styled from 'styled-components';
import { Container } from '../base';
import { Select, AutoSave, Input } from '../form';
import * as saleOffersApi from '../../api/landing';

// eslint-disable-next-line react/prop-types
const CitySelect = ({ field }) => (
  <Select {...field}>
    <option value="Москва">Москва</option>
    <option value="Санкт-Петербург">Санкт-Петербург</option>
    <option value="Екатеринбург">Екатеринбург</option>
    <option value="Астрахань">Астрахань</option>
    <option value="Барнаул">Барнаул</option>
    <option value="Владивосток">Владивосток</option>
    <option value="Волгоград">Волгоград</option>
    <option value="Воронеж">Воронеж</option>
    <option value="Ижевск">Ижевск</option>
    <option value="Иркутск">Иркутск</option>
    <option value="Казань">Казань</option>
    <option value="Кемерово">Кемерово</option>
    <option value="Киров">Киров</option>
    <option value="Краснодар">Краснодар</option>
    <option value="Красноярск">Красноярск</option>
    <option value="Липецк">Липецк</option>
    <option value="Махачкала">Махачкала</option>
    <option value="Набережные Челны">Набережные Челны</option>
    <option value="Нижний Новгород">Нижний Новгород</option>
    <option value="Новокузнецк">Новокузнецк</option>
    <option value="Новосибирск">Новосибирск</option>
    <option value="Омск">Омск</option>
    <option value="Оренбург">Оренбург</option>
    <option value="Пенза">Пенза</option>
    <option value="Пермь">Пермь</option>
    <option value="Ростов-на-Дону">Ростов-на-Дону</option>
    <option value="Рязань">Рязань</option>
    <option value="Самара">Самара</option>
    <option value="Саратов">Саратов</option>
    <option value="Сочи">Сочи</option>
    <option value="Тольятти">Тольятти</option>
    <option value="Томск">Томск</option>
    <option value="Тюмень">Тюмень</option>
    <option value="Ульяновск">Ульяновск</option>
    <option value="Уфа">Уфа</option>
    <option value="Хабаровск">Хабаровск</option>
    <option value="Челябинск">Челябинск</option>
    <option value="Ярославль">Ярославль</option>
  </Select>
);

const renderTermOpts = term => (
  <option key={term.tid} value={term.tid}>
    {term.name}
  </option>
);

const FieldWrapper = styled(Box)([]);

FieldWrapper.defaultProps = {
  mx: [0, 0, 2],
  mb: [3, 3, 0],
  width: ['100%', '100%', 'auto'],
};

class SaleOffersSearchForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      occasions: [],
      formats: [],
      menuPreferences: [],
      isOptsLoaded: false,
    };
  }

  async componentDidMount() {
    try {
      const { occasions, formats, menuPreferences } = await saleOffersApi.getTaxonomy();
      this.setState({ isOptsLoaded: true, occasions, formats, menuPreferences });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { occasions, formats, menuPreferences, isOptsLoaded } = this.state;
    const occasionOptions = occasions.map(renderTermOpts);
    const formatOptions = formats.map(renderTermOpts);
    const preferencesOptions = menuPreferences.map(renderTermOpts);

    // eslint-disable-next-line react/prop-types
    const { initialValues, onSubmit } = this.props;

    return (
      <Container p={[2, 3, 4]}>
        <Formik
          initialValues={Object.assign(
            {},
            {
              occasion: 'all',
              person: '',
              format: 'all',
              menuPreference: 'all',
              city: 'Москва',
            },
            initialValues,
          )}
          onSubmit={onSubmit}
        >
          <Form>
            {isOptsLoaded && (
              <>
                <Flex
                  flexWrap={['wrap', 'wrap', 'nowrap']}
                  mx={[0, 0, -2]}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <FieldWrapper>
                    <Field
                      name="occasion"
                      render={({ field }) => (
                        <>
                          <Text htmlFor="occasion">Повод</Text>
                          <Select
                            {...field}
                            id="occasion"
                            emptyOption={{ value: 'all', text: 'Любой' }}
                          >
                            {occasionOptions}
                          </Select>
                        </>
                      )}
                    />
                  </FieldWrapper>
                  <FieldWrapper>
                    <Field
                      render={({ field }) => (
                        <>
                          <Text htmlFor="person">Кол-во персон</Text>
                          <Input {...field} id="person" type="text" placeholder="45" />
                        </>
                      )}
                      name="person"
                    />
                  </FieldWrapper>
                  <FieldWrapper>
                    <Field
                      name="format"
                      render={({ field }) => (
                        <>
                          <Text htmlFor="format">Формат</Text>
                          <Select
                            {...field}
                            id="format"
                            emptyOption={{ value: 'all', text: 'Любой' }}
                          >
                            {formatOptions}
                          </Select>
                        </>
                      )}
                    />
                  </FieldWrapper>
                  <FieldWrapper>
                    <Field
                      name="menuPreference"
                      render={({ field }) => (
                        <>
                          <Text htmlFor="menuPreference">Предпочтения</Text>
                          <Select
                            {...field}
                            id="menuPreference"
                            emptyOption={{ value: 'all', text: 'Любой' }}
                          >
                            {preferencesOptions}
                          </Select>
                        </>
                      )}
                    />
                  </FieldWrapper>
                  <FieldWrapper>
                    <>
                      <Text htmlFor="city">Город</Text>
                      <Field name="city" id="city" component={CitySelect} />
                    </>
                  </FieldWrapper>
                </Flex>
                <AutoSave onSave={onSubmit} />
              </>
            )}
          </Form>
        </Formik>
      </Container>
    );
  }
}

export default SaleOffersSearchForm;
