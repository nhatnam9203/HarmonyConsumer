import React from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import {
  ItemList,
  Total,
  Note,
  PopupDelete,
  Status,
  StoreInfo,
} from './widget';
import { Text, Modal2 as Modal, Header, StatusBar } from 'components';
import { AppointmentReview } from '@shared/components';

import images from 'assets';
import styles from './styles';
import { scaleHeight } from 'utils';
import useHook from './hook';
import { isEmpty } from 'lodash';
import LoadingDetail from './widget/LoadingDetail';

export default function index(props) {
  const [
    back,
    openInbox,
    start,
    status,
    setEditAppointment,
    setReschedule,
    setIsPopup,
    setLoading,
    services,
    products,
    extras,
    appointment_detail_customer,
    duration,
    total,
    notes,
    isPopup,
    isLoadingPopup,
    cancelAppointment,
    onPressNo,
    goToAddNote,
    isDisabled,
    depositAmount,
    reaction,
  ] = useHook(props);

  if (isEmpty(appointment_detail_customer)) {
    return <LoadingDetail />;
  }

  return (
    <>
      <View style={styles.container}>
        <View style={{ backgroundColor: '#f8f8f8' }}>
          <StatusBar barStyle="dark-content" />
          <Header
            title="Appointment detail"
            headerLeft
            headerRight
            onBack={back}
            onPressRight={openInbox}
          />
        </View>
        <View style={styles.body}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <RowStatus start={start} status={status} />
            <StoreInfo />

            {status !== 'paid' &&
              status !== 'cancel' &&
              parseInt(isDisabled) !== 1 && (
                <View style={styles.rowButton}>
                  <Button
                    onPress={setEditAppointment}
                    title="Edit service"
                    icon={images.icon_edit}
                  />
                  <Button
                    onPress={setReschedule}
                    title="Reschedule"
                    icon={images.icon_reschedule}
                  />
                  <Button
                    onPress={() => setIsPopup(true)}
                    isRed
                    title="Cancel"
                    icon={images.icon_cancel}
                  />
                </View>
              )}

            <View style={styles.padding3}>
              <ItemList
                setLoading={setLoading}
                services={services}
                products={products}
                extras={extras}
                status={status}
              />
              <Total
                status={status}
                totalPaid={appointment_detail_customer.total}
                duration={duration}
                total={total}
                depositAmount={depositAmount}
                subTotal={appointment_detail_customer.subTotal}
                discount={appointment_detail_customer.discount}
                tax={appointment_detail_customer.tax}
              />
              <Note goToAddNote={goToAddNote} notes={notes} />
              <View style={{ height: scaleHeight(3) }} />

              {reaction && <AppointmentReview reviewInfo={reaction} />}
              <View style={{ height: scaleHeight(50) }} />
            </View>
          </ScrollView>
        </View>

        <Modal isVisible={isPopup} onRequestClose={() => {}}>
          <PopupDelete
            isLoading={isLoadingPopup}
            onPressYes={cancelAppointment}
            onPressNo={onPressNo}
          />
        </Modal>
      </View>
    </>
  );
}

const Button = ({ title, icon, isRed = false, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
      <Image style={styles.iconButton} source={icon} />
      <Text style={[styles.txtBottom, { color: isRed ? 'red' : '#404040' }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const RowStatus = ({ start, status }) => {
  return (
    <View style={styles.rowStatus}>
      <Text fontFamily="medium" style={styles.date}>
        {start}
      </Text>
      <Status status={status} />
    </View>
  );
};
