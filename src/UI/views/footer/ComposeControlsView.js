import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import IconButton from '../../buttons/IconButton';

import { composeControlsViewStyles as styles } from './styles';

// DISPLAYS THE CONTROLS BAR AT THE COMPOSE SCREEN
// Takes the following props:
// onPhotoPress (handles the Photo display action)
// onCameraPress (handles the Camera display action)
// onComposePress (handles create new post action)

const photoIcon = require('../../../../assets/icons/photo.png');
const cameraIcon = require('../../../../assets/icons/camera.png');
const composeIcon = require('../../../../assets/icons/compose.png');
const moreIcon = require('../../../../assets/icons/more.png');

const ComposeControlsView = ({
  onPhotoPress,
  onCameraPress,
  onComposePress,
  onMorePress,
}) => (
  <View style={styles.container}>
    <View style={styles.leftButtonView}>
      <IconButton icon={photoIcon} onPress={onPhotoPress} />
      <IconButton icon={cameraIcon} onPress={onCameraPress} />
      <IconButton icon={moreIcon} onPress={onMorePress} />
    </View>
    <View style={styles.rightButtonView}>
      <IconButton icon={composeIcon} onPress={onComposePress} />
    </View>
  </View>
);

ComposeControlsView.propTypes = {
  onPhotoPress: PropTypes.func.isRequired,
  onCameraPress: PropTypes.func.isRequired,
  onComposePress: PropTypes.func.isRequired,
  onMorePress: PropTypes.func.isRequired,
};

export default ComposeControlsView;
