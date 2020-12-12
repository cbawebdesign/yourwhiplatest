import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Slider } from 'react-native';
// import { CustomText as Text, BODY_FONT } from '../../text/CustomText';

import { sliderViewStyles as styles } from './styles';

// DISPLAYS THE CAMERA'S SLIDERVIEW
// Takes the following props:
// onSliderViewChange (gets the slider current position)
// value (sets the slider position)
// onSlidingStart (used to reset hiding slider after pinch)
// onSlidingComplete (used to hide the slider after release)

// NOTE: the 'showDuration' function will not show correctly for
// recordings of 1 hour longer

const SliderView = ({
  onSliderValueChange,
  value,
  onSlidingStart,
  onSlidingComplete,
}) => {
  const [sliderValue, setSliderValue] = useState(0);

  const renderScale = () => {
    if (value >= 0 && value < 0.1) return '1';
    if (value === 1) return '10';

    return `${(value * 10).toFixed(0)}`;
  };

  useEffect(() => {
    setSliderValue(value * 145);
  }, [value]);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.minMaxText}>x1</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={150}
          onValueChange={(val) => {
            setSliderValue(val);
            onSliderValueChange(val);
          }}
          onSlidingStart={onSlidingStart}
          onSlidingComplete={onSlidingComplete}
          minimumTrackTintColor="#ffffff00"
          maximumTrackTintColor="#ffffff"
          thumbTintColor="transparent"
        />
        <Text style={styles.minMaxText}>x10</Text>
      </View>
      <View
        style={[styles.zoomView, { left: sliderValue + 25 }]}
        pointerEvents="none"
      >
        <Text style={styles.symbol}>x</Text>
        <Text style={styles.zoom}>{renderScale()}</Text>
      </View>
    </View>
  );
};

SliderView.propTypes = {
  onSliderValueChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  onSlidingStart: PropTypes.func.isRequired,
  onSlidingComplete: PropTypes.func.isRequired,
};

export default SliderView;
