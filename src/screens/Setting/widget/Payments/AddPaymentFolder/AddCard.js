import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles';
import { scaleWidth } from 'utils';
import Input from '../../PersonalInfo/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TextInputMask } from 'react-native-masked-text';
import Menu, { MenuItem } from 'react-native-material-menu';

const schema = Yup.object().shape({
  cardNumber: Yup.string().required('Required'),
  cardName: Yup.string().required('Required'),
});

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let years = [];
for (let i = 2020; i <= 2050; i++) {
  years.push(i);
}

export default function Payment(props) {
  const refMenuMonth = React.useRef(null);
  const refMenuYear = React.useRef(null);

  const [month_expire, setMonth] = React.useState(11);
  const [year_expire, setYear] = React.useState(2020);
  const [cvv, setCVV] = React.useState('');

  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      cardName: '',
    },
    validationSchema: schema,
    onSubmit: values => {},
  });

  const { values, handleChange, errors, handleSubmit, isValid } = formik;

  const hideMenuMonth = async data => {
    setMonth(data);
    refMenuMonth.current?.hide();
  };

  const showMenuMonth = () => {
    refMenuMonth.current?.show();
  };

  const hideMenuYear = async data => {
    setYear(data);
    refMenuYear.current?.hide();
  };

  const showMenuYear = () => {
    refMenuYear.current?.show();
  };

  const onChangeCVV = data => {
    setCVV(data);
  };

  return (
    <View style={{ marginTop: scaleWidth(5), flex: 1, position: 'relative' }}>
      <Text style={styles.txtCreditCard}>CREDIT CARD</Text>
      <Input
        value={values.cardNumber}
        onChange={handleChange('cardNumber')}
        width={scaleWidth(94)}
        label="Card Number"
        placeholder="Card Number"
        isForce
        isLabel
        error={errors.cardNumber}
        optionsMask={{ mask: '9999 9999 9999 9999' }}
      />
      <Input
        value={values.cardName}
        onChange={handleChange('cardName')}
        width={scaleWidth(94)}
        label="Card Holder Name"
        placeholder="Name on card"
        isForce
        isLabel
        error={errors.cardName}
        optionsMask={{ mask: '*************************************' }}
      />
      <View style={styles.rowExpireDate}>
        <View>
          <Text style={styles.txtNormal}>
            <Text>Expired Date</Text>
            <Text style={{ color: 'red' }}> *</Text>
          </Text>
          <View style={{ flexDirection: 'row', marginTop: scaleWidth(3) }}>
            <Menu
              style={{ height: scaleWidth(70), width: scaleWidth(25) }}
              ref={refMenuMonth}
              button={
                <TouchableOpacity
                  onPress={showMenuMonth}
                  style={styles.itemSelect}>
                  <Text style={styles.txtNormal}>{month_expire}</Text>
                  <AntDesign
                    name="down"
                    size={scaleWidth(2.8)}
                    color={'#404040'}
                  />
                </TouchableOpacity>
              }>
              <ScrollView>
                {months.map((month, index) => (
                  <MenuItem
                    key={`${month}${index}`}
                    onPress={() => hideMenuMonth(month)}>
                    {month}
                  </MenuItem>
                ))}
              </ScrollView>
            </Menu>

            <Menu
              style={{
                height: scaleWidth(70),
                width: scaleWidth(25),
                marginLeft: scaleWidth(3),
              }}
              ref={refMenuYear}
              button={
                <TouchableOpacity
                  onPress={showMenuYear}
                  style={[styles.itemSelect, { marginLeft: scaleWidth(3) }]}>
                  <Text style={styles.txtNormal}>{year_expire}</Text>
                  <AntDesign
                    name="down"
                    size={scaleWidth(2.8)}
                    color={'#404040'}
                  />
                </TouchableOpacity>
              }>
              <ScrollView>
                {years.map((year, index) => (
                  <MenuItem
                    key={`${year}${index}`}
                    onPress={() => hideMenuYear(year)}>
                    {year}
                  </MenuItem>
                ))}
              </ScrollView>
            </Menu>
          </View>
        </View>

        <View>
          <Text style={styles.txtNormal}>
            <Text>CVV Code</Text>
            <Text style={{ color: 'red' }}> *</Text>
          </Text>
          <View style={[styles.itemSelect, { marginTop: scaleWidth(3) }]}>
            <TextInputMask
              value={cvv}
              onChangeText={data => onChangeCVV(data)}
              type="custom"
              options={{ mask: '9999' }}
              placeholder={'CVV'}
              placeholderTextColor="#A9A9A9"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.buttonAddCard}>
        <Text style={styles.txtButtonAddCard}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}
