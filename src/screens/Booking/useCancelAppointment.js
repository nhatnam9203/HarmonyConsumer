import actions from '@redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export const useCancelAppointment = () => {
  const dispatch = useDispatch();

  const token = useSelector(state => state.datalocalReducer.token);
  const { appointment } = useSelector(state => state.bookingReducer) || {};

  return {
    cancelAppointment: () => {
      if (!appointment?.appointmentId) return;
      const body = {
        status: 'cancel',
      };
      // setLoadingPopup(true);
      dispatch(
        actions.appointmentAction.updateStatusAppointment(
          body,
          token,
          appointment?.appointmentId,
          () => {},
        ),
      );
    },
  };
};
