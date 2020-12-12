import EStyleSheet from 'react-native-extended-stylesheet';
import { StyleSheet } from 'react-native';

export const cameraViewStyles = EStyleSheet.create({
  $gradientColorFrom: '$primary1',
  $gradientColorTo: '$primary2',

  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  counter: {
    flex: 1,
    textAlign: 'center',
    fontSize: 24,
  },
  gradientView: {
    width: '100%',
    justifyContent: 'flex-start',
    paddingTop: 12,
  },
  sliderView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: -37.5,
    transform: [{ rotate: '270deg' }],
    opacity: 0,
  },
});

export const sliderViewStyles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  slider: {
    width: 175,
    height: 25,
  },
  minMaxText: {
    transform: [{ rotate: '90deg' }],
    color: '$white',
    height: 25,
  },
  zoomView: {
    transform: [{ rotate: '90deg' }],
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '$white',
    opacity: 1,
    backgroundColor: '$white',
  },
  zoom: {
    textAlign: 'center',
    fontSize: 12,
    color: '$black',
  },
  symbol: {
    color: '$black',
    fontSize: 12,
    marginRight: 0,
  },
});

export const cameraControlsViewStyles = EStyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 85,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonView: {
    padding: 25,
  },
  largeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 25,
    marginLeft: 35,
    marginRight: 35,
  },
  cameraDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'red',
  },
  smallButton: {
    width: 25,
    height: 25,
  },
});

export const rasterViewStyles = EStyleSheet.create({
  gridView: {
    flex: 1,
    width: '100%',
  },
  gridLineHorizontal: {
    position: 'absolute',
    width: '100%',
    borderColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  gridLineVertical: {
    position: 'absolute',
    height: '100%',
    borderColor: 'white',
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
});

export default {
  cameraViewStyles,
  cameraControlsViewStyles,
};
