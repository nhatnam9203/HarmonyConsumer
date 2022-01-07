import React from 'react';
import { View } from 'react-native';
import Text from '../Text';
import Configs from '@src/configs';
import { scaleSize } from 'utils';
import PropTypes from 'prop-types';
const {
  COLORS: { BLACK, RED },
  FONTSIZE,
} = Configs;
export default function Label({
  label,
  isRequire,
  fontSize,
  style = { height: scaleSize(20), flex: 1 },
}) {
  return (
    <View style={[{ flexDirection: 'row' }, style]}>
      <Text fontSize={fontSize} color={BLACK}>
        {label}
      </Text>
      {isRequire && (
        <Text
          style={{
            marginLeft: scaleSize(5),
            top: -scaleSize(5),
          }}
          fontSize={20}
          color={RED}>
          *
        </Text>
      )}
    </View>
  );
}
Label.propTypes = {
  label: PropTypes.string,
  isRequire: PropTypes.bool,
  fontSize: PropTypes.number,
};
Label.defaultProps = {
  label: '',
  isRequire: false,
  fontSize: FONTSIZE.regular,
};
