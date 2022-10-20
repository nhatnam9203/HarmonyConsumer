import React, { useState } from 'react';
import { View, 
  FlatList, 
  RefreshControl, 
  ScrollView, 
  TouchableOpacity,
 } from 'react-native';
 import Image from "react-native-fast-image";
import { useDispatch, useSelector } from 'react-redux';

import actions from '@redux/actions';
import { PrimaryCard, MoreCard, AddCard } from './widget';
import ICONS from 'assets';
import {
  Header,
  StatusBar,
  Text,
  FocusAwareStatusBar,
} from 'components';
import * as RootNavigation from 'navigations/RootNavigation';
import styles from './style';
import { scaleSize } from 'utils';

export default function index(props) {
  const { navigation } = props;
  const dispatch = useDispatch();
  const token = useSelector(state => state.datalocalReducer.token);
  const userInfo = useSelector(state => state.datalocalReducer.userInfo);
  const card_more = useSelector(state => state.cardReducer.card_more);
  const card_primary = useSelector(state => state.cardReducer.card_primary);
  const loading_card = useSelector(
    state => state.creditAndBankReducer.loading_card,
  );
  const appUpdate = useSelector(state => state.app.appCallUpdate);

  const _card_more = React.useMemo(
    () => [...card_more, { giftCardId: -1 }],
    [card_more],
  );

  const [isRefresh, setRefresh] = useState(false);

  const getCardByUser = () => {
    dispatch(actions.cardAction.get_card_by_user(token, userInfo.userId));
  };

  const openDrawer = () => {
    navigation.openDrawer();
  };
  const goToDetailCard = (item = {}) => {
    dispatch(actions.cardAction.set_card_detail(item));
    RootNavigation.navigate('DetailGiftCard');
  };

  const gotoAddNewCard = () => {
    RootNavigation.navigate('AddNewCard');
  };

  const openInbox = () => {
    RootNavigation.navigate('Inbox');
  };

  const onRefresh = () => {
    setRefresh(true);
    dispatch(
      actions.cardAction.get_card_by_user(token, userInfo.userId, setRefresh),
    );
  };

  const onHandleBuyGift = () => {
    props.navigation.navigate({name: 'StoreScreen', params: { isAddGiftCard: true }});
  }

  const emptyCardView = () => {
console.log(' !card_primary && !_card_more',  !card_primary && !_card_more, card_primary, _card_more)
    return(
      !card_primary && (!_card_more || _card_more.length == 1)?
        <View style={styles.emptyCardView}>
          <Text style={styles.titleText}>You haven't any gift card</Text>
          <Text style={styles.normalText}>Please tap the button to Buy Gift or Add a Card to use for transactions</Text>
          <TouchableOpacity
            style={styles.buyGiftButton}
            onPress={onHandleBuyGift}>
            <Text 
              style={styles.buyGiftText}
            >
              Buy gift
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection:'row'}}
            onPress={gotoAddNewCard}
          >
            <Image style={styles.icon_reload} source={ICONS.add} tintColor='#0764B0'/>
            <Text style={styles.textAddCard}>Add a card</Text>
          </TouchableOpacity>
        </View>
      : !card_primary ? 
      <View style={styles.viewButtonBuyGiftCard}>
        <TouchableOpacity
          style={styles.buyGiftButton}
          onPress={onHandleBuyGift}>
          <Text 
            style={styles.buyGiftText}
          >
            Buy gift
          </Text>
        </TouchableOpacity>
      </View> : <></>
    )
    
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
        <FocusAwareStatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
        />
        <StatusBar barStyle="dark-content" />
        <Header
          title="Gift card"
          headerLeft={true}
          headerRight={true}
          iconLeft={ICONS['drawer']}
          onBack={openDrawer}
          onPressRight={openInbox}
        />
        <ScrollView
          style={{ flex: 1, backgroundColor: 'white' }}
        >
          { 
            emptyCardView()
          }
          
          <MyCard
            isRefresh={isRefresh}
            onRefresh={onRefresh}
            card_primary={card_primary}
            goToDetailCard={goToDetailCard}
            getCardByUser={getCardByUser}
            ListEmptyComponent={() => (
              <ListEmptyComponent gotoAddNewCard={gotoAddNewCard} />
            )}
            ItemSeparatorComponent={() => <ItemSeparatorComponent />}
            _card_more={_card_more}
            gotoAddNewCard={gotoAddNewCard}
            onHandleBuyGift={onHandleBuyGift}
          />
        </ScrollView>
    </View>
  );
}

const MyCard = ({
  isRefresh,
  onRefresh,
  tabLabel,
  card_primary,
  goToDetailCard,
  getCardByUser,
  ListEmptyComponent,
  ItemSeparatorComponent,
  _card_more,
  gotoAddNewCard,
  onHandleBuyGift,
}) => {
  return (
    
    
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={isRefresh}
          onRefresh={onRefresh}
          size={30}
          progressBackgroundColor="#FFFF"
          colors={['#0764B0']}
          tintColor="#0764B0"
        />
      }
      contentContainerStyle={styles.content_flatlist}
      ListHeaderComponent={() => 
        (<>
          {card_primary && (
            <PrimaryCard
              card={card_primary}
              onPress={goToDetailCard}
              onReload={getCardByUser}
              onHandleBuyGift={onHandleBuyGift}
              onPressAddCard={gotoAddNewCard}
            />
          )}
          {((_card_more && _card_more.length > 1) || card_primary) &&
            <View style={styles.moreCardView}>
              <Text fontSize={15} color="#646464" fontFamily="medium" style={styles.txtMoreCard}>
                MORE CARDS
              </Text>
              <TouchableOpacity
                style={{flexDirection:'row'}}
                onPress={gotoAddNewCard}
              >
                <Image style={styles.icon_reload} source={ICONS.add} tintColor='#0764B0'/>
                <Text style={styles.textAddCard}>Add a card</Text>
              </TouchableOpacity>
            </View>
          }
          
        </>
        )
      
      }
      ListEmptyComponent={ListEmptyComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
      data={_card_more}
      numColumns={2}
      keyExtractor={(_, index) => index + ''}
      renderItem={({ item, index }) => {
        const _marginLeft = index % 2 != 0 ? { marginLeft: scaleSize(15) } : {};
        return (
          <React.Fragment>
            {item.giftCardId > -1 && (
              <MoreCard
                item={item}
                index={index}
                style={_marginLeft}
                onPress={goToDetailCard}
              />
            ) 
            // : (
            //   <AddCard onPress={gotoAddNewCard} style={_marginLeft} />
            // )
          }
          </React.Fragment>
        );
      }}
    />
    
  );
};

const ListEmptyComponent = ({ gotoAddNewCard }) => (
  <View style={{ flex: 1 }}>
    <Text fontSize={15} color="#646464" style={{ marginBottom: scaleSize(15) }}>
      You have no cards
    </Text>
    <AddCard onPress={gotoAddNewCard} />
  </View>
);

const ItemSeparatorComponent = () => <View style={styles.seperator} />;
