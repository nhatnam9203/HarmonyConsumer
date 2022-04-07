import React from 'react';
import { convertMinsToHrsMins } from 'utils';
import { useSelector } from 'react-redux';
import { totalDuration } from '../helper';
import ButtonAddMore from './ButtonAddMore';
import ButtonAddNote from './ButtonAddNote';
import NotesList from './NotesList';
import NoteValue from './NoteValue';
import TotalInfo from './Totalnfo';

export default function index(props) {
  const {
    goToServicesList,
    goToAddNote,
    services,
    extras,
    products,
    isCheckout,
    isDeposit,
  } = props;

  const { userInfo } = useSelector(state => state.datalocalReducer);
  const { firstName } = userInfo;
  const { notes, isEditAppointment, noteValue } = useSelector(
    state => state.bookingReducer,
  );

  const duration = totalDuration(services, extras);

  return (
    <>
      <ButtonAddMore onPress={goToServicesList} />
      <TotalInfo
        isEditAppointment={isEditAppointment}
        duration={convertMinsToHrsMins(duration)}
        services={services}
        extras={extras}
        products={products}
        isDeposit={isDeposit}
      />
      <ButtonAddNote noteValue={noteValue} goToAddNote={goToAddNote} />
      <NoteValue noteValue={noteValue} />
      <NotesList
        isEditAppointment={isEditAppointment}
        notes={notes}
        firstName={firstName}
      />
    </>
  );
}
