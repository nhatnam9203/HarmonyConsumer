import React, { createContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDeviceId, getDeviceName } from '@shared/services/Device';
import actions from '@actions';
import VersionCheck from 'react-native-version-check';
import Configs from '@configs';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';

const log = (obj, message = '') => {
  // Logger.log(`[CodePushProvider] ${message}`, obj);
};

export const AppStateContext = createContext({});

export const AppStateProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [networkState, setNetworkState] = React.useState(true);
  const [networkMsg, setNetworkMsg] = React.useState(null);

  const loadDeviceInfo = async () => {
    const deviceId = await getDeviceId();
    const deviceName = await getDeviceName();
    const latestVersion = await VersionCheck.getLatestVersion({
      provider: 'appStore',
    });
  };

  // React useEffect
  React.useEffect(() => {
    loadDeviceInfo();
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetworkState(state?.isConnected);
    });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (networkState) {
      setNetworkMsg(null);
    } else {
      setNetworkMsg('You are currently offline!');
    }
  }, [networkState]);

  // React render
  return (
    <AppStateContext.Provider value={{ networkState }}>
      {children}
    </AppStateContext.Provider>
  );
};
