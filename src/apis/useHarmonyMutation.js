import { axios } from '@shared/services/axiosClient';
import React from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';

let cancelToken;

export const useHarmonyMutation = ({
  onSuccess,
  onError,
  onLoginError,
  isLoadingDefault = true,
  isStopLoading = false,
  enabled = false,
  isCancelToken = false,
  queryKey,
}) => {
  const dispatch = useDispatch();
  const [queryData, setQueryData] = React.useState(null);

  const requestByAxios = async () => {
    const response = await axios(queryData?.params);
    return response?.data;
  };

  const { mutate, status, isError, isFetching, data } = useMutation(
    queryKey ?? queryData?.queryId,
    requestByAxios,
    {
      onSuccess: response => {
        const { codeNumber, codeStatus, data, message } = response || {};
        if (codeNumber == 200) {
          if (onSuccess && typeof onSuccess === 'function') {
            onSuccess(data);
          }
        } else {
          if (onError && typeof onError === 'function') {
            onError({
              codeNumber,
              codeStatus,
              message,
            });
          }
        }
      },
      onError: err => {
        if (onError && typeof onError === 'function') {
          onError(err);
        }
      },
    }, // disable fetch auto
  );

  const callRequest = args => {
    setQueryData(args);
  };

  React.useEffect(() => {
    if (queryData) {
      mutate();
    }
  }, [queryData]);

  return [{ isLoading: isFetching, data }, callRequest];
};
