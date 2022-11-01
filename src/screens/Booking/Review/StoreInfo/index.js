import React from 'react';
import { View } from 'react-native';
import images from 'assets';
import moment from 'moment-timezone';
import { totalDuration } from '../helper';
import { useSelector } from 'react-redux';
import Rating from './Rating';
import BusinessName from './BusinessName';
import Address from './Address';
import LogoStore from './LogoStore';
import DateAppointment from './DateAppointment';
import styles from './styles';

export default function StoreInfo(props) {
  const {
    goToSelectDate,
    merchant,
    fromTime,
    services,
    extras,
    status,
    isEditAppointment,
  } = props || {};

  const {
    businessName = "Store's name",
    addressFull = "Store's address",
    banners = [],
    rating,
  } = merchant;

  const merchant_detail = useSelector(
    state => state.storeReducer.merchant_detail,
  );

  // console.log(merchant_detail.timezone);

  // const date =
  //   merchant_detail.timezone && merchant_detail.timezone !== '0'
  //     ? moment(fromTime)
  //         .tz(merchant_detail.timezone.substring(12))
  //         .format('dddd, MMMM DD YYYY')
  //     : moment(fromTime).format('dddd, MMMM DD YYYY');

  const date = moment(fromTime).format('dddd, MMMM DD YYYY');

  // console.log(fromTime);
  // console.log(date);

  const renderImgStore =
    banners.length > 0 ? { uri: banners[0].imageUrl } : images.bannerMerchant;
  const duration = totalDuration(services, extras);

  return (
    <View style={styles.container}>
      {!isEditAppointment && (
        <DateAppointment
          date={date}
          status={status}
          duration={duration}
          fromTime={fromTime}
          goToSelectDate={goToSelectDate}
        />
      )}
      <View style={styles.rowInfo}>
        <LogoStore imgStore={renderImgStore} />
        <View style={styles.infoRight}>
          <BusinessName
            name={businessName}
            isEditAppointment={isEditAppointment}
          />
          {isEditAppointment && <Rating rating={rating} />}
          <Address address={addressFull} />
        </View>
      </View>
    </View>
  );
}
