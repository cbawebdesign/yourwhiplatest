import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { useSafeArea } from 'react-native-safe-area-context';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

import SliderView from './SliderView';
import RasterView from './RasterView';
import FooterView from '../footer/FooterView';
import CameraControlsView from './CameraControlsView';
import { CustomText as Text, TITLE_FONT } from '../../text/CustomText';

import { cameraViewStyles as styles } from './styles';

// DISPLAYS THE CAMERA'S MAIN VIEW
// Takes the following props:
// flashMode (enables/disables the camera flash)
// onShootPress (processes the take-image-action)
// onRotatePress (handles the front-camara, back-camera control action)
// onFlashModePress (handles the use of the camera flash)
// cameraType (controls display of camera or video icon in CameraControlsView)
// onCameraPress (handles use of photo or video camera)
// recording (checks if camera is recording)
// processing (checks if a photo is being processed)
// disableCamera (disables video camera switch button; default 'false')

// NOTE: the 'showDuration' function will not show correctly for
// recordings of 1 hour longer

const VIEW_HEIGHT = Dimensions.get('window').height;

const ZOOM_HIDE_DURATION = 2500;

const CameraView = ({
  flashMode,
  onShootPress,
  onRotatePress,
  onFlashModePress,
  cameraType,
  onCameraPress,
  recording,
  processing,
  disableCamera,
  onZoom,
}) => {
  const paddingTop = useSafeArea().top;

  const ZOOM_RATIO = 0.01;
  const SLIDER_MAX_VALUE = 150;

  let mounted = true;
  let prevPinch = 1;
  let timerCamera;
  let timerZoom;

  const [counter, setCounter] = useState(0);
  const [scale, setScale] = useState(0);
  const [showZoom, setShowZoom] = useState(false);

  const showDuration = () => {
    const minutes = Math.floor(counter / 60);
    const seconds = counter - minutes * 60;

    return `${minutes > 0 ? `0${minutes}` : '00'}:${
      seconds > 9 ? seconds : `0${seconds}`
    }`;
  };

  const handlePinchStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      prevPinch = 1;
      timerZoom = setTimeout(() => {
        if (mounted) {
          setShowZoom(false);
        }
      }, ZOOM_HIDE_DURATION);
    } else if (
      nativeEvent.oldState === State.BEGAN &&
      nativeEvent.state === State.ACTIVE
    ) {
      prevPinch = 1;
      setShowZoom(true);
      if (timerZoom) {
        clearTimeout(timerZoom);
      }
    }
  };

  const handlePinchChange = ({ nativeEvent }) => {
    const newScale = nativeEvent.scale - prevPinch;
    if (newScale > 0 && newScale > ZOOM_RATIO) {
      prevPinch = nativeEvent.scale;
      setScale(Math.min(scale + ZOOM_RATIO, 1));
    } else if (newScale < 0 && newScale < -ZOOM_RATIO) {
      prevPinch = nativeEvent.scale;
      setScale(Math.max(scale - ZOOM_RATIO, 0));
    }
  };

  const handleSliderValueChange = (value) => {
    setShowZoom(true);
    setScale(Math.max(value / SLIDER_MAX_VALUE, 0));
  };

  const handleSlidingComplete = () => {
    timerZoom = setTimeout(() => {
      if (mounted) {
        setShowZoom(false);
      }
    }, ZOOM_HIDE_DURATION);
  };

  useEffect(() => {
    onZoom(scale);

    return () => {
      mounted = false;
      return clearTimeout(timerZoom);
    };
  }, [scale]);

  useEffect(() => {
    if (recording) {
      timerCamera = setInterval(() => setCounter((count) => count + 1), 1000);
    }

    return () => {
      mounted = false;
      setCounter(0);
      return clearInterval(timerCamera);
    };
  }, [recording]);

  return (
    <PinchGestureHandler
      onHandlerStateChange={handlePinchStateChange}
      onGestureEvent={handlePinchChange}
    >
      <View style={styles.innerContainer}>
        <View
          style={[
            styles.sliderView,
            showZoom && { opacity: 1 },
            { top: (VIEW_HEIGHT - 85 - paddingTop) / 2 - 7 },
          ]}
        >
          <SliderView
            onSliderValueChange={handleSliderValueChange}
            value={scale}
            onSlidingStart={() => clearTimeout(timerZoom)}
            onSlidingComplete={handleSlidingComplete}
          />
        </View>
        {cameraType === 'PHOTO' ? (
          <RasterView />
        ) : (
          <Text
            text={showDuration()}
            fontFamily={TITLE_FONT}
            style={[styles.counter, { paddingTop: paddingTop + 16 }]}
          />
        )}
        <FooterView height={85} hasGradient>
          <CameraControlsView
            onShootPress={onShootPress}
            onRotatePress={onRotatePress}
            onCameraPress={onCameraPress}
            onFlashModePress={onFlashModePress}
            flashMode={flashMode}
            cameraType={cameraType}
            recording={recording}
            processing={processing}
            disableCamera={disableCamera}
          />
        </FooterView>
      </View>
    </PinchGestureHandler>
  );
};

CameraView.propTypes = {
  flashMode: PropTypes.number.isRequired,
  onShootPress: PropTypes.func.isRequired,
  onRotatePress: PropTypes.func.isRequired,
  onFlashModePress: PropTypes.func.isRequired,
  cameraType: PropTypes.string.isRequired,
  onCameraPress: PropTypes.func.isRequired,
  recording: PropTypes.bool.isRequired,
  processing: PropTypes.bool.isRequired,
  disableCamera: PropTypes.bool.isRequired,
};

export default CameraView;
