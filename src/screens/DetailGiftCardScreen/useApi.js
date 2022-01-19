import { getUserCardById, useAxiosQuery } from '@apis';

export const useApi = ({ userCardId, callBack }) => {
  const [, getUserCard] = useAxiosQuery({
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
