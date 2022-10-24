import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../axiosBaseQuery';
import { appointmentBuilder } from './appointment';
import { staffBuilder } from './staff';
import { useCardBuilder } from './userCard';

export const harmonyApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: '',
  }),
  endpoints: builder => {
    const appointmentBuilders = appointmentBuilder(builder);
    const staffBuilders = staffBuilder(builder);
    const useCardBuilders = useCardBuilder(builder);

    return {
      ...appointmentBuilders,
      ...staffBuilders,
      ...useCardBuilders,
    };
  },
});
