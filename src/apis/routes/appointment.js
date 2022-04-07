export const createAppointment = data => ({
  queryId: 'createAppointment',
  params: {
    url: `/appointment`,
    method: 'POST',
    data,
  },
});
