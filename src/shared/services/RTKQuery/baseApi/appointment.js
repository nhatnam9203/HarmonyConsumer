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
    query: ({ appointmentId, userCardId, isAddAppointment }) => ({
      url: `UserCard/PayDeposit/${appointmentId}?userCardId=${userCardId}&isAddAppointment=${isAddAppointment}`,
      method: 'PUT',
    }),
  }),

  cancelDepositAppointment: builder.mutation({
    query: appointmentId => ({
      url: `appointment/cancelpaydeposit/${appointmentId}`,
      method: 'PUT',
    }),
  }),

  reviewAppointment: builder.mutation({
    query: ({ appointmentId, data }) => ({
      url: `appointment/reaction/${appointmentId}`,
      method: 'POST',
      data,
    }),
  }),
});
