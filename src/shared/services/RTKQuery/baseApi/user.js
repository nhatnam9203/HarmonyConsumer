export const userBuilder = builder => ({
  staffLogin: builder.mutation({
    query: userId => ({
      url: `user/delete/${userId}`,
      method: 'PUT',
    }),
  }),
});
