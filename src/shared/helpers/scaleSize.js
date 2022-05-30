import { Dimensions, PixelRatio } from 'react-native';
const { width, height } = Dimensions.get('window');

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const scaleText = size => wp(size);

const screenHeight = () => (width >= height ? width : height);

const screenWidth = () => (height >= width ? width : height);

const scaleWidth = size => {
  const widthScale = Math.round(screenWidth() * (size / 414));
  return widthScale;
};

const scaleHeight = size => {
  const heightScale = Math.round(screenHeight() * (size / 895));
  return heightScale;
};

const scale = width / 414;
function scaleFont(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

module.exports = {
  scaleFont,
  scaleHeight,
  scaleWidth,
  screenWidth,
  screenHeight,
  scaleText,
};
