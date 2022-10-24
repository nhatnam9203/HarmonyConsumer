export const useCardBuilder = builder => ({
  getUserCardByMerchant: builder.query({
    query: merchantId => ({
      url: `usercard/getbymerchant/${merchantId}`,
    }),
  }),
});
