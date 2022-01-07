import React from 'react';
import { useSelector } from 'react-redux';
import { ItemCardPlaceHolder } from 'components';
import { scaleSize } from 'utils';
import Configs from '@src/configs';

const BannerLoading = () => {
  const placeholders = useSelector(
    state => state.datalocalReducer.placeholders,
  );

  return (
    <React.Fragment>
      {placeholders.map((item, index) => (
        <ItemCardPlaceHolder
          key={index + ''}
          width={Configs.CARD_WIDTH - 20}
          height={scaleSize(265)}
          borderRadius={5}
          style={{ marginHorizontal: scaleSize(5) }}
        />
      ))}
    </React.Fragment>
  );
};

export default BannerLoading;
