import React from 'react';
import { getUserCardById, useAxiosQuery } from '@apis';

export const useApi = ({ userCardId, callBack }) => {
  const [isLoading, getUserCard] = useAxiosQuery({
    ...getUserCardById(userCardId),
    enabled: false,
    onSuccess: (data, response) => {
      if (callBack && typeof callBack === 'function') {
        callBack('getUserCardById', data);
      }
    },
  });

  return {
    getUserCard,
  };
};
