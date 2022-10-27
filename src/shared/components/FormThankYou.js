import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import ICONS from 'assets';

export const FormThankYou = ({ onHandleSubmitDone }) => {
  const _onHandleDone = () => {
    if (onHandleSubmitDone && typeof onHandleSubmitDone === 'function') {
      onHandleSubmitDone();
    }
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: '#0005',
        zIndex: 1000,
      }}>
      <View
        style={{
          width: scaleWidth(350),
          height: scaleHeight(350),
          borderRadius: scaleWidth(16),
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={ICONS.icon_check} style={{ alignSelf: 'center' }} />
        <View style={{ height: scaleHeight(20) }} />
        <Text
          style={{
            fontSize: scaleFont(24),
            fontWeight: '700',
            alignSelf: 'center',
          }}>
          Thank you!
        </Text>
        <View style={{ height: scaleHeight(10) }} />
        <Text
          style={{
            fontSize: scaleFont(16),
            fontWeight: '400',
            alignSelf: 'center',
          }}>
          Thank you for submitting your feedback.
        </Text>
        <View style={{ height: scaleHeight(20) }} />
        <TouchableOpacity
          style={{
            backgroundColor: '#0764B0',
            height: scaleHeight(45),
            width: scaleWidth(200),
            alignSelf: 'center',
            borderRadius: scaleWidth(8),
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={_onHandleDone}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: scaleFont(16),
              color: 'white',
            }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
