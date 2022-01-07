import React from 'react';
import { getUserCardById, useAxiosQuery } from '@apis';

export const useApi = () => {
  const [isLoading, getUserCard] = useAxiosQuery({
    ...getUserCardById(),
    enabled: true,
    onSuccess: (data, response) => {},
  });

  return {
    getUserCard,
  };
};
