import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image } from 'react-native';

import { cameraControlsViewStyles as styles } from './styles';

// DISPLAYS THE CAMERA BOTTOM CONTROLS
// Takes the following props:
// flashMode (enables/disables the camera flash)
// onShootPress (processes the take-image-action)
// onRotatePress (handles the front-camara, back-camera control action)
// onFlashModePress (handles the use of the camera flash)
// cameraType (handles display of photo or camera icon)
// onCameraPress (handles use of photo or video camera)
// recording (checks if camera is recording)
// processing (checks if a photo is being processed)
// disableCamera (disables video camera switch button; default 'false')

const rotateIcon = require('../../../../assets/icons/rotate.png');
const videoIcon = require('../../../../assets/icons/camera.png');
const flashIconOff = require('../../../../assets/icons/flash_off.png');
const flashIconOn = require('../../../../assets/icons/flash_on.png');
const moreIcon = require('../../../../assets/icons/more.png');
const cameraIcon = require('../../../../assets/icons/photo.png');

const CameraControlsView = ({
  flashMode,
  onShootPress,
  onRotatePress,
  onFlashModePress,
  cameraType,
  onCameraPress,
  recording,
  processing,
  disableCamera,
}) => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={() => null}
      disabled={recording}
      activeOpacity={0.9}
    >
      <View style={[styles.buttonView, recording && { opacity: 0.2 }]}>
        <Image style={styles.smallButton} source={moreIcon} />
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onFlashModePress}
      disabled={cameraType === 'CAMERA'}
      activeOpacity={0.9}
    >
      <View
        style={[styles.buttonView, cameraType === 'CAMERA' && { opacity: 0.2 }]}
      >
        <Image
          style={styles.smallButton}
          source={flashMode === 0 ? flashIconOff : flashIconOn}
        />
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onShootPress}
      disabled={processing}
      activeOpacity={0.9}
    >
      <View style={[styles.largeButton, processing && { opacity: 0.2 }]}>
        {cameraType === 'CAMERA' && <View style={styles.cameraDot} />}
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onRotatePress}
      disabled={recording}
      activeOpacity={0.9}
    >
      <View style={[styles.buttonView, recording && { opacity: 0.2 }]}>
        <Image style={styles.smallButton} source={rotateIcon} />
      </View>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={onCameraPress}
      disabled={recording || disableCamera}
      activeOpacity={0.9}
    >
      <View
        style={[
          styles.buttonView,
          (recording || disableCamera) && { opacity: 0.2 },
        ]}
      >
        <Image
          style={styles.smallButton}
          source={cameraType === 'PHOTO' ? videoIcon : cameraIcon}
        />
      </View>
    </TouchableOpacity>
  </View>
);

CameraControlsView.propTypes = {
  onShootPress: PropTypes.func.isRequired,
  onRotatePress: PropTypes.func.isRequired,
  onFlashModePress: PropTypes.func.isRequired,
  cameraType: PropTypes.string.isRequired,
  onCameraPress: PropTypes.func.isRequired,
  recording: PropTypes.bool.isRequired,
  processing: PropTypes.bool.isRequired,
  disableCamera: PropTypes.bool.isRequired,
};

export default CameraControlsView;
