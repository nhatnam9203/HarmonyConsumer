import React from 'react';
import { View } from 'react-native';
import ScrollableTabView from 'components/react-native-scrollable-tab-view';
import { useDispatch, useSelector } from 'react-redux';

import actions from '@redux/actions';
import { ContactTab, ManuallyTab, PopupInvite } from './widget';
import ICONS from 'assets';
import { Text, 
  HeaderCustom, 
  SearchBar, 
  DefaultTabBar, 
  StatusBar 
} from 'components';
import * as RootNavigation from 'navigations/RootNavigation';
import { Modal2 as Modal } from 'components';
import styles from './style';

export default function index(props) {
  const dispatch = useDispatch();

  const [key, setKey] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [isPopupInvite, setPopupInvite] = React.useState(false);
  const clickingTimeoutRef = React.useRef(null);

  /* state for popup invite sendlink */
  const [infoReceiver, setInfoReceiver] = React.useState('');
  const [textInviteSuccess, setTextInvite] = React.useState();
  const [isLoadingInvite, setLoadingInvite] = React.useState(false);

  const onBack = () => {
    RootNavigation.back();
  };

  const goToFinalReview = () => {
    RootNavigation.navigate('FinalReview');
  };

  const filterContactList = value => {
    setKey(value);

    if (clickingTimeoutRef.current) {
      clearTimeout(clickingTimeoutRef.current);
    }

    clickingTimeoutRef.current = setTimeout(() => {
      dispatch(actions.buygiftAction.fitler_contacts(value));
    }, 300);
  };

  const onHandleChangeTab = tab => {
    if (!tab) return;

    setPage(tab.i);
  };

  const setStatusPopupInvite = (status, phone) => {
    if (status == true) setInfoReceiver(phone);
    setPopupInvite(status);
  };

  const sendLinkInvite = () => {
    RootNavigation.navigate('FinalReview', { infoReceiver });
    setStatusPopupInvite(false);
  };

  React.useEffect(() => {
    return () => {
      if (clickingTimeoutRef.current) {
        clearTimeout(clickingTimeoutRef.current);
      }
    };
  }, []);

  const onCancel = () => {
    dispatch(actions.buygiftAction.set_gift_send({}));
    props.navigation.popToTop();
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ backgroundColor: '#f8f8f8' }}>
        <StatusBar />
        <HeaderCustom 
          title="Buy gift" 
          headerLeft={true} 
          onBack={onBack}
          onRightPress={onCancel}
          headerRight={true}
          textRight={'Cancel'}
          textRightStyle={styles.textCancel}
          colorTextRight={'red'} />
      </View>

      <View style={styles.container_center}>
        <View style={styles.header}>
          <Text fontSize={17} color="#666666">
            Select the account for payment
          </Text>
        </View>
        <SearchBar
          placeholder="Search..."
          placeholderTextColor="#A9A9A9"
          iconLeft={ICONS['searchbar']}
          width={382}
          height={45}
          onChangeText={filterContactList}
          value={key}
          editable={page == 0 ? true : false}
          isEditSelectCredit={page}
        />
      </View>

      <View style={styles.wrapper_tabs}>
        <ScrollableTabView
          onChangeTab={onHandleChangeTab}
          renderTabBar={() => (
            <DefaultTabBar
              style={styles.tabs}
              tabStyle={styles.tab}
              tabBarUnderlineStyle={{ backgroundColor: '#0764b0' }}
              widthTabBarUnderline={200}
              activeTextColor="#0764b0"
              inactiveTextColor="#404040"
            />
          )}
          initialPage={0}>
          <ContactTab tabLabel="Contacts" onNextScreen={goToFinalReview} />
          <ManuallyTab
            setStatusPopupInvite={setStatusPopupInvite}
            tabLabel="Manually"
            onNextScreen={goToFinalReview}
          />
        </ScrollableTabView>
      </View>

      <Modal isVisible={isPopupInvite} onRequestClose={() => {}}>
        <PopupInvite
          setStatusPopupInvite={setStatusPopupInvite}
          sendLinkInvite={sendLinkInvite}
          isLoadingInvite={isLoadingInvite}
          textInviteSuccess={textInviteSuccess}
        />
      </Modal>
    </View>
  );
}

const ItemSeperator = () => <View style={{ height: 15 }}></View>;
