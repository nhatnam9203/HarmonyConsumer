export const userBuilder = builder => ({
  deleteUserAccount: builder.mutation({
    query: ({ userId, message }) => ({
      url: `user/delete/${userId}`,
      method: 'PUT',
      data: {
        reason: message,
      },
    }),
  }),
});
