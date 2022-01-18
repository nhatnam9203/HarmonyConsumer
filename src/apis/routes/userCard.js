export const getUserCardById = id => ({
  queryId: 'getUserCardById',
  params: {
    url: `/UserCard/${id}`,
    method: 'GET',
  },
});
