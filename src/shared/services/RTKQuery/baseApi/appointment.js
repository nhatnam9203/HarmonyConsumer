export const appointmentBuilder = builder => ({
  getAppointment: builder.query({
    query: appointmentId => ({
      url: `appointment/${appointmentId}`,
    }),
  }),

  createAppointment: builder.mutation({
    query: data => ({
      url: `appointment`,
      method: 'POST',
      data,
    }),
  }),

  depositAppointment: builder.mutation({
    query: appointmentId => ({
      url: `user/PayDeposit/${appointmentId}`,
      method: 'PUT',
    }),
  }),
});
