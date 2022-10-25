export const userBuilder = builder => ({
  deleteUserAccount: builder.mutation({
    query: userId => ({
      url: `user/delete/${userId}`,
      method: 'PUT',
      data: {
        reason: 'string',
      },
    }),
  }),
});
