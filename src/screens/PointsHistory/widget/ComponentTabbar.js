import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { scaleWidth } from 'utils';
import { Text } from 'components';

const tabs = [
  {
    key: 0,
    name: 'Get Star',
  },
  {
    key: 1,
    name: 'Use Star',
  },
];

const CustomTab = ({ goToPage, activeTab }) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
      }}>
      {tabs.map((tab, index) => {
        return (
          <TouchableOpacity
            style={{
              width: '50%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              height: 40,
              backgroundColor: 'white',
              borderTopWidth: 0,
              borderBottomColor: '#0764B0',
              borderBottomWidth: index === activeTab ? 4 : 0,
            }}
            onPress={() => goToPage(index)}
            key={index}>
            <Text
              style={{
                color: index === activeTab ? '#0764B0' : '#888888',
                fontSize: scaleWidth(4.3),
                fontWeight: '500',
              }}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTab;
