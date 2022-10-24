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
    query: ({ appointmentId, userCardId }) => ({
      url: `UserCard/PayDeposit/${appointmentId}?userCardId=${userCardId}`,
      method: 'PUT',
    }),
  }),

  cancelDepositAppointment: builder.mutation({
    query: appointmentId => ({
      url: `appointment/cancelpaydeposit/${appointmentId}`,
      method: 'PUT',
    }),
  }),
});
