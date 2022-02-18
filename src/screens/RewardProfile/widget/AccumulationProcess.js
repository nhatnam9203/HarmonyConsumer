import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Text } from 'components';
import { scaleWidth } from 'utils';
import images from 'assets';
import { ProgressBar } from 'components';
import Feather from 'react-native-vector-icons/Feather';

export default function AccumulationProcess(props) {
  const goToPointsHistory = () => {
    props.navigation.navigate('PointsHistory');
  };

  const goToMemberBenefit = () => {
    props.navigation.navigate('MemberBenefit');
  };

  const { percentToNextRank, currentRank, nextRankExp, nextRank } = props;

  function renderNextRankIcon() {
    switch (currentRank) {
      case 'Bronze':
        return (
          <View style={styles.row}>
            <Image source={images.crowns_bronze} style={styles.iconImage} />
            <Image source={images.crowns_silver} style={styles.iconImage} />
          </View>
        );
      case 'Silver':
        return (
          <View style={styles.row}>
            <Image source={images.crowns_silver} style={styles.iconImage} />
            <Image source={images.crowns_gold} style={styles.iconImage} />
          </View>
        );
      case 'Gold':
        return (
          <View style={styles.row}>
            <Image source={images.crowns_gold} style={styles.iconImage} />
            <Image source={images.crowns_platinum} style={styles.iconImage} />
          </View>
        );
      case 'Platium':
        return (
          <View style={styles.row}>
            <Image source={images.crowns_gold} style={styles.iconImage} />
            <Image source={images.crowns_platinum} style={styles.iconImage} />
          </View>
        );
      default:
        break;
    }
  }

  function renderProgressBar() {
    if (currentRank !== 'Platium') {
      return (
        <ProgressBar
          percent={parseFloat(percentToNextRank)}
          colorThumb={'#0764B0'}
          colorTrack={'#F6F6F6'}
        />
      );
    } else {
      return (
        <ProgressBar
          percent={parseFloat(100)}
          colorThumb={'#0764B0'}
          colorTrack={'#F6F6F6'}
        />
      );
    }
  }

  function renderContent() {
    return (
      <View style={styles.contentWrap}>
        <Text
          style={
            styles.txtContent
          }>{`Accumulate ${nextRankExp} to become a `}</Text>
        <Text
          style={[
            styles.txtContent,
            { color: '#0764B0' },
          ]}>{`${nextRank} member`}</Text>
      </View>
    );
  }

  function renderMaxPoint() {
    return (
      <View style={styles.contentWrap}>
        <Text
          style={[
            styles.txtContent,
            { color: '#0764B0' },
          ]}>{`Congratulations ! `}</Text>
        <Text
          style={styles.txtContent}>{`You have reached the highest rank`}</Text>
      </View>
    );
  }

  return (
    <React.Fragment>
      <TouchableOpacity
        disabled={true}
        activeOpacity={0.8}
        onPress={goToMemberBenefit}
        style={styles.container}>
        <Text style={styles.title}>Accumulation Process</Text>
        {renderNextRankIcon()}
        {renderProgressBar()}
        {currentRank !== 'Platium' && renderContent()}
        {currentRank == 'Platium' && renderMaxPoint()}
        {/* <Link title="Member benefits" /> */}
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={goToPointsHistory}
        style={styles.container}>
        <Link title="History" isPointHistory />
      </TouchableOpacity>
    </React.Fragment>
  );
}

const Link = ({ title, isPointHistory }) => {
  return (
    <View
      style={[
        styles.rowBottom,
        { marginTop: isPointHistory ? scaleWidth(0) : scaleWidth(3) },
      ]}>
      <Text style={styles.txtAccummulate}>{title}</Text>
      <Feather name="chevron-right" color={'#0764B0'} size={scaleWidth(4)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scaleWidth(94),
    marginHorizontal: scaleWidth(3),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 2,
    padding: scaleWidth(3),
    borderRadius: 3,
    backgroundColor: 'white',
    marginTop: scaleWidth(3),
  },
  contentWrap: {
    flexDirection: 'row',
    // borderBottomWidth: 1,
    // borderBottomColor: "#eeeeee",
    paddingBottom: scaleWidth(3),
  },
  txtContent: {
    marginTop: scaleWidth(2),
    fontSize: scaleWidth(3.5),
    color: '#888888',
  },
  title: {
    color: '#585858',
    fontSize: scaleWidth(4),
  },
  image: {
    width: scaleWidth(8),
    height: scaleWidth(8),
  },
  quantity: {
    color: '#0764B0',
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
    fontSize: scaleWidth(7),
    marginLeft: scaleWidth(1.4),
  },
  txtPoint: {
    color: '#888888',
    fontSize: scaleWidth(3.5),
    marginTop: scaleWidth(2),
    marginLeft: scaleWidth(1.4),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleWidth(3),
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    paddingBottom: scaleWidth(4),
    justifyContent: 'space-between',
    marginTop: scaleWidth(5),
  },
  rowBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scaleWidth(3),
    justifyContent: 'space-between',
  },
  txtAccummulate: {
    color: '#0764B0',
    fontSize: scaleWidth(4),
  },
  iconImage: {
    width: scaleWidth(5),
    height: scaleWidth(5),
  },
});
