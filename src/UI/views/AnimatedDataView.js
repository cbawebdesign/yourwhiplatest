import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, Animated } from 'react-native';

import { CustomText as Text, TITLE_FONT, BODY_FONT } from '../text/CustomText';
import PieChart from '../charts/PieChart';

import { animatedDataViewStyles as styles } from './styles';

// DISPLAYS THE DATA DISPLAY BLOCKS WITH GROW/SHRINK ANIMATION
// USED IN THE STATS TAB SCREENS
// Takes the following props:
// onPress (handles the main onPress action)
// active (triggers the grow/shrink animation)
// title (sets the bottom view (units) title)
// dataSet (sets the pie chart data; NOTE, must by array of objects with
// 'x' + 'y' keys only)
// growthAbsolute (sets the large center text in absolute numbers)
// growthPercentage (sets the text at the top as percentage)

const upIcon = require('../../../assets/icons/up.png');
const downIcon = require('../../../assets/icons/down.png');

const ANIMATION_DURATION = 300;

const AnimatedDataView = ({
  onPress,
  active,
  title,
  dataSet,
  growthAbsolute,
  growthPercentage,
}) => {
  const containerScale = useRef(new Animated.Value(styles.$smallContainer))
    .current;

  const containerStyles = [
    styles.container,
    { transform: [{ scale: containerScale }] },
  ];

  const getIcon = () => {
    if (growthPercentage >= 0) {
      return upIcon;
    }

    return downIcon;
  };

  const setToActive = () => {
    Animated.timing(containerScale, {
      toValue: styles.$largeContainer,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  const setToInactive = () => {
    Animated.timing(containerScale, {
      toValue: styles.$smallContainer,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (active) {
      setToActive();
    } else {
      setToInactive();
    }
  }, [active]);

  return (
    <TouchableOpacity
      style={{ zIndex: active ? 999 : 0 }}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Animated.View style={containerStyles}>
        <View style={styles.dataViewHeader}>
          <Image source={getIcon()} style={styles.icon} />
          <Text
            text={`${growthPercentage}%`}
            fontFamily={BODY_FONT}
            style={styles.growth}
          />
        </View>
        <View pointerEvents="none" style={styles.pieChartView}>
          <PieChart dataSet={dataSet} />
          <Text
            text={growthAbsolute}
            fontFamily={TITLE_FONT}
            style={styles.growthAbsolute}
          />
        </View>
        <Text text={title} fontFamily={TITLE_FONT} style={styles.footerText} />
      </Animated.View>
    </TouchableOpacity>
  );
};

AnimatedDataView.prototype = {
  active: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  dataSet: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.string.isRequired,
      y: PropTypes.number.isRequired,
    })
  ),
  growthAbsolute: PropTypes.number.isRequired,
  growthPercentage: PropTypes.number.isRequired,
};

export default AnimatedDataView;
