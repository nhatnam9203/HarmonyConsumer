import { get_all_template } from '@redux/actions/buygiftAction';
import { Button, ProgressiveImage, Text } from 'components';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Image from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { scaleSize } from 'utils';
import CustomTemplate from './custom_template';

export default function Item({ item, onPress }) {
  const { name } = item;
  const dispatch = useDispatch();
  const token = useSelector(state => state.datalocalReducer.token);
  const templates = useSelector(state => state.buygiftReducer.templates);
  const loading_template = useSelector(
    state => state.buygiftReducer.loading_template,
  );

  const data = React.useMemo(() => {
    // !templates[name] && loading_template[name] ? [] : templates[name]
    if (templates.hasOwnProperty(name)) {
      return templates[name];
    } else if (loading_template[name]) {
      return [];
    }
  }, [templates, loading_template]);

  React.useEffect(() => {
    dispatch(get_all_template(token, name));
  }, []);

  const onHandleOnPress = item => () => {
    // item['type'] = 'template_available';
    onPress(Object.assign({}, item, { type: 'template_available' }));
  };

  return (
    <View style={styles.container_template}>
      <Text
        fontSize={17.5}
        color="#0764B0"
        fontFamily={'medium'}
        style={{ marginBottom: scaleSize(10) }}>
        {name}
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={_ListEmptyComponent}
        ItemSeparatorComponent={_ItemSeparatorComponent}
        data={data}
        keyExtractor={(_, index) => index + ''}
        renderItem={({ item, index }) => {
          if (item.giftCardType == 'Add New Card') {
            return <CustomTemplate onPress={onPress} />;
          }
          return <Template item={item} onPress={onHandleOnPress} />;
        }}
      />
    </View>
  );
}

const _ItemSeparatorComponent = () => <View style={{ width: scaleSize(15) }} />;

const _ListEmptyComponent = () => (
  <View style={{ flex: 1 }}>
    <Text>List is empty</Text>
  </View>
);

const Template = ({ item, onPress }) => (
  <Button
    style={{
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.15,
      shadowRadius: 1.25,
      borderRadius: 5,
    }}
    onPress={onPress(item)}>
    <ProgressiveImage
      resizeMode="cover"
      source={{ uri: item.imageUrl, priority: Image.priority.high }}
      style={styles.template}
    />
  </Button>
);

const styles = StyleSheet.create({
  container_template: {
    width: '100%',
    height: scaleSize(145),
    justifyContent: 'space-between',
  },

  template: {
    width: scaleSize(186),
    height: scaleSize(113),
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1.24,
  },
});
