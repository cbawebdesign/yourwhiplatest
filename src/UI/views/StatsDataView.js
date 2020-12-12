import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import AnimatedDataView from './AnimatedDataView';

import { statsDataViewStyles as styles } from './styles';

// DISPLAYS THE STATISTICS DATA DISPLAY USED INSIDE THE STATS TAB SCREENS
// Takes the following props:
// dataSet (holds the pie chart data; NOTE, must be an array of objects
// containing 'x' + 'y' keys only)
// onPress (handles the data blocks main press action)
// likesActive (activates the likes data block)
// followersActive (activates the folowers data block)

const StatsDataView = ({ dataSet, onPress, likesActive, followersActive }) => {
  if (dataSet === null) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <AnimatedDataView
        title="Likes"
        active={likesActive}
        onPress={() => onPress('LIKES')}
        dataSet={[
          { x: '', y: dataSet.likesGrowth },
          { x: '', y: 100 - dataSet.likesGrowth },
        ]}
        growthAbsolute={dataSet.likesAbsolute}
        growthPercentage={dataSet.likesGrowth}
      />
      <AnimatedDataView
        title="Followers"
        active={followersActive}
        onPress={() => onPress('FOLLOWERS')}
        dataSet={[
          { x: '', y: dataSet.followersGrowth },
          { x: '', y: 100 - dataSet.followersGrowth },
        ]}
        growthAbsolute={dataSet.followersAbsolute}
        growthPercentage={dataSet.followersGrowth}
      />
    </View>
  );
};

StatsDataView.defaultProps = {
  dataSet: null,
};

StatsDataView.propTypes = {
  dataSet: PropTypes.shape({
    likesAbsolute: PropTypes.number.isRequired,
    followersAbsolute: PropTypes.number.isRequired,
    likesGrowth: PropTypes.number.isRequired,
    followersGrowth: PropTypes.number.isRequired,
  }),
  onPress: PropTypes.func.isRequired,
  likesActive: PropTypes.bool.isRequired,
  followersActive: PropTypes.bool.isRequired,
};

export default StatsDataView;
