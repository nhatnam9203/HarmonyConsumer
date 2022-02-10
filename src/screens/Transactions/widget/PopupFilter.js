import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Text } from 'components';
import { scaleWidth, scaleHeight, slop } from 'utils';
import AntDesign from 'react-native-vector-icons/AntDesign';
import images from 'assets';

const initialState = {
  filter_data: [
    {
      key: 0,
      value: 'All type',
      isCheck: true,
      type: 'all',
    },
    {
      key: 1,
      value: 'Gift card transactions',
      isCheck: false,
      type: 'giftcard',
    },
    {
      key: 2,
      value: 'Payment transactions',
      isCheck: false,
      type: 'payment',
    },
  ],
};

export default class PopupFilter extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  pickValueFilter = item => {
    const { filter_data } = this.state;
    let filter = filter_data;
    for (let i = 0; i < filter.length; i++) {
      if (filter[i].key === item.key) {
        filter[i].isCheck = true;
        this.props.selectFilter(filter[i]);
      } else {
        filter[i].isCheck = false;
      }
    }
    this.setState({ filter_data: filter });
  };

  renderItemsFilter = () => {
    const { filter_data } = this.state;
    return filter_data.map((obj, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => this.pickValueFilter(obj)}
        style={[styles.row, styles.rowItem]}>
        <Text style={styles.content}>{obj.value}</Text>
        <Image
          style={styles.icon}
          source={obj.isCheck ? images.check_box : images.check_box_empty}
        />
      </TouchableOpacity>
    ));
  };

  render() {
    const { closeModal } = this.props;

    return (
      <View style={styles.container}>
        <View style={[styles.row, styles.rowTitle]}>
          <Text style={styles.title}>Transaction type</Text>
          <TouchableOpacity onPress={closeModal} hitSlop={slop}>
            <AntDesign name="close" size={scaleWidth(6)} color="#404040" />
          </TouchableOpacity>
        </View>
        {this.renderItemsFilter()}
        <View style={{ height: scaleHeight(5) }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: scaleWidth(5),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: scaleWidth(5),
    fontWeight: Platform.OS === 'android' ? 'bold' : '600',
  },
  rowTitle: {
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    paddingBottom: scaleWidth(3),
  },
  content: {
    fontSize: scaleWidth(4.3),
    color: '#404040',
  },
  rowItem: {
    marginTop: scaleHeight(2),
    marginBottom: scaleHeight(1),
  },
  icon: {
    width: scaleWidth(5),
    height: scaleWidth(5),
  },
});
