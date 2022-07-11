import React from 'react';
import {
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import Contacts from 'react-native-contacts';
import { useDispatch, useSelector } from 'react-redux';
import actions from '@redux/actions';
import { CheckBox, Form, Text } from 'components';
import ICONS from 'assets';
import { isEmpty } from 'lodash';
import {
  formatPhoneNumberContact,
  formatPhoneStandard,
  scaleSize,
  scaleWidth,
} from 'utils';

const { ButtonSubmit } = Form;

export default function creditCard({ onNextScreen }) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.datalocalReducer.token);
  const result_filter = useSelector(
    state => state.buygiftReducer.result_filter,
  );
  const gift_send = useSelector(state => state.buygiftReducer.gift_send);

  const userInfo = useSelector(state => state.datalocalReducer.userInfo);

  const { phone } = userInfo || {};

  const [contact, setContact] = React.useState(null);

  const getAllContacts = async () => {
    Contacts.getAll((err, contacts) => {
      let phones = contacts
        .filter(
          item => !isEmpty(item.phoneNumbers) && item.phoneNumbers.length > 0,
        )
        .map(item => {
          if (item.phoneNumbers[0]) {
            const number = replaceAll(item.phoneNumbers[0].number, ' ', '');
            let phone;
            if (number.includes('+84')) {
              phone =
                number?.substring(1, 3) +
                formatPhoneStandard(number?.substring(3));
            } else if (number.includes('+1')) {
              phone =
                number.substring(1, 2) +
                formatPhoneStandard(number.substring(2));
            } else if (number.charAt(0) == '8' && number.charAt(1) == '4') {
              phone =
                number?.substring(0, 2) +
                formatPhoneStandard(number?.substring(2));
            } else if (number.charAt(0) == '1') {
              phone =
                number?.substring(0, 1) +
                formatPhoneStandard(number?.substring(1));
            } else if (!isEmpty(number) && formatPhoneNumberContact(number)) {
              phone = replaceAll(formatPhoneNumberContact(number), '+', '');
            }
            return phone;
          }
        });

      let tempPhone = phone.toString().replace('+', '');
      phones = phones.filter(obj => obj !== tempPhone);
      if (!isEmpty(phones))
        dispatch(actions.buygiftAction.get_contacts(token, phones));
    });
  };

  const requestPerContactsAndroid = async () => {
    // await PermissionsAndroid.request(
    //   PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    //   {
    //     title: 'Contacts',
    //     message: 'This app would like to view your contacts.',
    //     buttonPositive: 'Please accept bare mortal',
    //   },
    // ).then(getAllContacts);

    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
    ]);
    if (
      granted['android.permission.READ_CONTACTS'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.WRITE_CONTACTS'] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      // await getAllContacts();
    } else {
      console.log('Camera permission denied');
    }

    // async granted => {
    //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //     await getAllContacts();
    //   } else {
    //     console.log('Camera permission denied');
    //   }
    // }
  };

  const requestPerContacts = () => {
    try {
      Contacts?.checkPermission().then(res => {
        if (res == 'authorized') {
          getAllContacts();
        }
        if (res == undefined) {
          Contacts.requestPermission((err, contacts) => {
            if (res == 'authorized') {
              getAllContacts();
            }
          });
        }
        if (res == 'denied') {
          alert('Permission contact denined');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      requestPerContactsAndroid();
    } else {
      requestPerContacts();
    }
  }, []);

  function escapeRegExp(string) {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
  }

  function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  }

  const onHandleChangeValue = item => () => {
    if (item != contact) setContact(item);
  };

  const goToFinalReview = () => {
    let _gift_send = Object.assign({}, gift_send, { receiver: contact });

    dispatch(actions.buygiftAction.set_gift_send(_gift_send));
    onNextScreen();
  };

  const renderContactList = ({ item, index }) => {
    const { fullName, phone, avatarURL } = item;
    const checked = item == contact ? true : false;
    const avatar = avatarURL ? { uri: avatarURL } : ICONS['personal'];
    return (
      <View style={styles.container}>
        <Image source={avatar} style={styles.image} />

        <View style={styles.content_text}>
          <Text fontSize={15} fontFamily="medium" style={styles.text}>
            {fullName || 'Unknown'}
          </Text>

          <Text fontSize={15} color="#585858">
            {phone}
          </Text>
        </View>

        <CheckBox checked={checked} onValueChange={onHandleChangeValue(item)} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: scaleWidth(3) }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={result_filter}
        keyExtractor={(_, index) => index + ''}
        contentContainerStyle={{
          paddingTop: scaleSize(20),
          paddingBottom: scaleSize(50),
        }}
        renderItem={renderContactList}
        ItemSeparatorComponent={ItemSeperator}
        ListEmptyComponent={ListEmptyComponent}
        scrollEventThrottle={1}
      />

      <View style={styles.button}>
        <ButtonSubmit
          onSubmit={goToFinalReview}
          title="Next"
          disabled={contact ? false : true}
          backgroundColor={contact ? '#0764B0' : '#f6f6f6'}
          textColor={contact ? '#FFF' : '#585858'}
        />
      </View>
    </View>
  );
}

const ItemSeperator = () => <View style={{ height: scaleSize(10) }} />;
const ListEmptyComponent = () => (
  <Text fontSize={15} style={{ textAlign: 'center' }}>
    List is empty
  </Text>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  image: {
    width: scaleSize(60),
    height: scaleSize(60),
    marginRight: scaleSize(10),
    borderRadius: scaleSize(300),
  },
  content_text: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: scaleSize(4),
  },
  text: {
    fontWeight: Platform.OS === 'android' ? 'bold' : '500',
    fontSize: scaleSize(17),
  },
  button: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    bottom: scaleSize(20),
    width: scaleWidth(100),
  },
});
