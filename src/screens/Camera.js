import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Camera as CameraController } from 'expo-camera';
import * as Permissions from 'expo-permissions';

import CameraView from '../UI/views/camera/CameraView';
import SelectionModal from '../UI/modals/SelectionModal';

import styles from './styles';

// DISPLAYS THE CAMERA SCREEN
// Applies the following props:
// route (contains params with navigation information about
// which screen to navigate back to)
// navigation (to set image info params and to navigate back to source screen)

// NOTE: When testing on simulator, camera is not supported
// To test the camera, use of a real device is required.

// NOTE: prop 'disableCamera' is used only when creating the profile picture
// Which does not allow video type.

const Camera = ({ route, navigation }) => {
  const cameraRef = useRef(null);

  const [hasPermission, setHasPermission] = useState(null);
  const [directionType, setDirectionType] = useState(
    CameraController.Constants.Type.back
  );
  const [cameraType, setCameraType] = useState(route.params.type || 'PHOTO');
  const [recording, setRecording] = useState(false);
  const [mediaCapture, setMediaCapture] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [flashMode, setFlashMode] = useState(
    CameraController.Constants.FlashMode.off
  );
  const [showModal, setShowModal] = useState(false);
  const [scale, setScale] = useState(0.5);

  const alertOptions = {
    title: 'Compose new post',
    body: mediaCapture
      ? `Use this ${
          mediaCapture.video ? 'video' : 'photo'
        } capture to compose a new post?`
      : '',
    buttonStyle: 'horizontal',
    buttons: [
      {
        title: 'Cancel',
        onPress: () => setShowModal(false),
      },
      {
        title: 'Compose',
        onPress: () => {
          setShowModal(false);
          navigation.navigate('Popup', {
            screen: 'Compose',
            params: mediaCapture.video
              ? { ...route.params, video: mediaCapture.video }
              : { ...route.params, photo: mediaCapture.photo },
          });
        },
      },
    ],
  };

  const handleShootPress = async () => {
    if (cameraRef) {
      const { permissions } = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL,
        Permissions.AUDIO_RECORDING
      );

      if (cameraType === 'CAMERA' && permissions.audioRecording.granted) {
        handleRecordVideo();
      } else if (
        cameraType === 'PHOTO' &&
        permissions.camera.granted &&
        permissions.cameraRoll.granted
      ) {
        handleTakePhoto();
      } else {
        await Permissions.askAsync(
          Permissions.CAMERA,
          Permissions.CAMERA_ROLL,
          Permissions.AUDIO_RECORDING
        );
      }
    }
  };

  const handleRecordVideo = async () => {
    if (!recording) {
      setRecording(true);
      const video = await cameraRef.current.recordAsync();

      if (route.params.fromScreen) {
        navigation.navigate(route.params.fromScreen, {
          video,
        });
      } else {
        setMediaCapture({ video });
        setShowModal(true);
      }
    } else {
      setRecording(false);
      cameraRef.current.stopRecording();
    }
  };

  const handleTakePhoto = async () => {
    setProcessing(true);
    const photo = await cameraRef.current.takePictureAsync();

    if (route.params.fromScreen) {
      setProcessing(false);
      navigation.navigate(route.params.fromScreen, {
        photo,
      });
    } else {
      setMediaCapture({ photo });
      setShowModal(true);
      setProcessing(false);
    }
  };

  const handleRotatePress = () => {
    setDirectionType(
      directionType === CameraController.Constants.Type.back
        ? CameraController.Constants.Type.front
        : CameraController.Constants.Type.back
    );
  };

  const handleFlashModePress = () => {
    setFlashMode(
      flashMode === CameraController.Constants.FlashMode.on
        ? CameraController.Constants.FlashMode.off
        : CameraController.Constants.FlashMode.on
    );
  };

  const checkPermissions = async () => {
    await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL,
      Permissions.AUDIO_RECORDING
    ).then((result) => {
      setHasPermission(result.status.granted);

      if (!result.granted) {
        navigation.goBack();
      }
    });
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  return (
    <>
      {showModal && (
        <SelectionModal
          showModal={showModal}
          onModalDismissPress={() => setShowModal(false)}
          options={alertOptions}
        />
      )}
      <CameraController
        style={styles.container}
        ref={cameraRef}
        type={directionType}
        flashMode={flashMode}
        ratio={
          directionType === CameraController.Constants.Type.front
            ? '16:9'
            : '15:7'
        }
        zoom={scale}
      >
        <CameraView
          onShootPress={handleShootPress}
          onRotatePress={handleRotatePress}
          onFlashModePress={handleFlashModePress}
          flashMode={flashMode}
          cameraType={cameraType}
          onCameraPress={() =>
            setCameraType(cameraType === 'PHOTO' ? 'CAMERA' : 'PHOTO')
          }
          onZoom={(zoom) => setScale(zoom)}
          recording={recording}
          processing={processing}
          disableCamera={route.params.fromScreen === 'Signup (Step 2)'}
        />
      </CameraController>
    </>
  );
};

Camera.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Camera;
