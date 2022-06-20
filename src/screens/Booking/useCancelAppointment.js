import actions from '@redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { harmonyApi } from '@shared/services';

export const useCancelAppointment = () => {
  const dispatch = useDispatch();

  const { appointment } = useSelector(state => state.bookingReducer) || {};
  const [cancelDepositAppointment] =
    harmonyApi.useCancelDepositAppointmentMutation();

  return {
    cancelAppointment: () => {
      if (!appointment?.appointmentId) return;

      if (appointment?.appointmentDepositStatus === 'NotPay') {
        cancelDepositAppointment(appointment?.appointmentId);
      }
    },
  };
};
