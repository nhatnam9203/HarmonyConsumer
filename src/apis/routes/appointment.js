export const createAppointment = data => ({
  queryId: 'createAppointment',
  params: {
    url: `/appointment`,
    method: 'POST',
    data,
  },
});

export const depositAppointment = appointmentId => ({
  queryId: 'depositAppointment',
  params: {
    url: `/user/PayDeposit/${appointmentId}`,
    method: 'PUT',
  },
});
