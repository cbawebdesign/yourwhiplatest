import React from 'react';
import { View, Dimensions } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import { rasterViewStyles as styles } from './styles';

const RasterView = () => {
  const VIEW_HEIGHT = Dimensions.get('window').height;

  return (
    <View
      style={[
        styles.gridView,
        {
          height: VIEW_HEIGHT - (85 + useSafeArea().bottom),
        },
      ]}
    >
      <View style={[styles.gridLineHorizontal, { top: '33%' }]} />
      <View style={[styles.gridLineHorizontal, { top: '67%' }]} />
      <View style={[styles.gridLineVertical, { left: '33%' }]} />
      <View style={[styles.gridLineVertical, { left: '67%' }]} />
    </View>
  );
};

export default RasterView;
