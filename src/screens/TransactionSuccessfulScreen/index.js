import React from 'react';
import { View, Image } from 'react-native';
import { useSelector } from 'react-redux';

import ICONS from 'assets';
import { formatMoney } from 'utils';
import { Text, Container, Form, Header } from 'components';
import * as RootNavigation from 'navigations/RootNavigation';
import styles from './style';

const { ButtonSubmit } = Form;

export default function index(props) {
  const gift_send = useSelector(state => state.buygiftReducer.gift_send);
  let { receiverInfo = null } = props.route.params;
  receiverInfo = receiverInfo.newPhoneInvite ? receiverInfo : null;

  const goBackRoot = () => {
    RootNavigation.navigate('Drawer');
  };

  return (
    <Container barStyle="dark-content">
      <Header title="Buy gift" />
      <View style={styles.container_center}>
        <Image source={ICONS['giftcard_sended']} style={styles.image} />

        <Text
          fontSize={23}
          fontFamily="medium"
          color="#1c98c9"
          style={styles.title}>
          Gift card has been sent !
        </Text>

        <Text fontSize={25} fontFamily="bold" color="#ed1c24">
          $ {formatMoney(gift_send.amount)}
        </Text>

        <Text fontSize={17} color="#404040" style={styles.content}>
          You've successfully sent the gift card to
        </Text>

        <Text
          fontSize={23}
          fontFamily="medium"
          color="#1c98c9"
          style={styles.title}>
          {receiverInfo
            ? receiverInfo.full_name
              ? receiverInfo.full_name
              : receiverInfo.newPhoneInvite
            : gift_send.receiver
            ? gift_send.receiver.fullName
            : ''}
        </Text>

        <View style={{ marginTop: 50 }}>
          <ButtonSubmit
            onSubmit={goBackRoot}
            title="Done"
            width={160}
            style={{ marginTop: 50 }}
          />
        </View>
      </View>
    </Container>
  );
}
