import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import Account from './Account';
import Card from './Card';
import Profile from './Profile';
import Security from './Security';
import Notification from './Notification';
import { Header, StatusBar, FocusAwareStatusBar } from 'components';
import * as RootNavigation from 'navigations/RootNavigation';
import { DeleteAccountButton } from './DeleteAccountButton';

export default function index(props) {
  const back = () => {
    RootNavigation.back();
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
      />
      <View style={{ backgroundColor: '#f8f8f8' }}>
        <StatusBar />
        <Header onBack={back} headerLeft title="Settings" />
      </View>
      <View style={styles.body}>
        <Profile />
        <Line />
        <Card />
        <Line />
        <Account />
        <Line />
        <Security />
        <Line />
        <Notification />
        <Line />
        <DeleteAccountButton />
      </View>
    </View>
  );
}

const Line = () => {
  return <View style={styles.line} />;
};
