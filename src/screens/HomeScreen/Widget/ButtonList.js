import ICONS from 'assets';
import { Button, Card, Text } from 'components';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { scaleSize } from 'utils';
import styles from '../../Setting/widget/General/styles';

const ButtonList = ({
  onBooking,
  onPaynow,
  invoice,
  onAddMoney,
  onAddCard,
  isShowAddMoney,
}) => {
  return (
    <View style={styleButtonList.container}>
      <Button
        onPress={onBooking}
        hitSlop={{ top: 0, left: 0, right: 0, bottom: 0 }}>
        <Card
          height={scaleHeight(70)}
          width={isShowAddMoney ? scaleWidth(120) : scaleWidth(180)}
          borderRadius={6}
          style={styleButtonList.card}>
          <Image
            style={styleButtonList.icon}
            source={ICONS['booking_button']}
          />
          <Text style={styleButtonList.textStyle}>Booking</Text>
        </Card>
      </Button>

      {isShowAddMoney &&
        <Button
          onPress={onAddMoney}
          hitSlop={{ top: 0, left: 0, right: 0, bottom: 0 }}>
          <Card
            height={scaleHeight(70)}
            width={scaleWidth(120)}
            borderRadius={6}
            style={styleButtonList.card}>
            <Image style={styleButtonList.icon} source={ICONS['addMoney']} />
            <Text style={styleButtonList.textStyle}>Add money</Text>
          </Card>
        </Button>
      }

      <Button
        onPress={onAddCard}
        hitSlop={{ top: 0, left: 0, right: 0, bottom: 0 }}>
        <Card
          height={scaleHeight(70)}
          width={isShowAddMoney ? scaleWidth(120) : scaleWidth(180)}
          borderRadius={6}
          style={styleButtonList.card}>
          <Image style={styleButtonList.icon} source={ICONS['addCard']} />
          <Text style={styleButtonList.textStyle}>Add a card</Text>
        </Card>
      </Button>

      {/* <Button hitSlop={{ top: 0, left: 0, right: 0, bottom: 0 }} onPress={onPaynow}>
        <Card
          width={CARD_WIDTH / 2 - 10}
          height={scaleSize(70)}
          borderRadius={6}
          style={styleButtonList.card}>
          <Image style={styleButtonList.icon} source={ICONS["paynow_button"]} />
          <Text color="#0764B0" fontSize={12}>
            Pay now
          </Text>

          {invoice > 0 && (
            <Badge
              title={invoice}
              backgroundColor="red"
              width={20}
              height={20}
              style={styleButtonList.badge}
            />
          )}
        </Card>
      </Button> */}
    </View>
  );
};
const styleButtonList = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: scaleSize(70),
    padding: scaleWidth(16),
  },
  card: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleSize(10),
  },
  icon: {
    width: scaleSize(24),
    height: scaleSize(24),
  },
  badge: {
    position: 'absolute',
    top: scaleSize(10),
    right: scaleSize(10),
  },
  textStyle: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: scaleFont(12),
    fontStyle: 'normal',
    fontWeight: 'normal',
    letterSpacing: -0.29,
    textAlign: 'center',
    color: '#0764b0',
  },
});
export default ButtonList;
