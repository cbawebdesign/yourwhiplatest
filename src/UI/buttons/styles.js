import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
import { COLORS } from '../../config/constants';

const VIEW_WIDTH = Dimensions.get('window').width;

export const blockButtonStyles = EStyleSheet.create({
  $gradientColorFrom: '$primary1',
  $gradientColorTo: '$primary2',

  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: VIEW_WIDTH - 100,
    height: 60,
  },
  gradientView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    color: '$black',
    fontSize: 10,
    textTransform: 'uppercase',
  },
});

export const textButtonStyles = EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  title: {
    opacity: 0.5,
    fontSize: 10,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
});

export const iconButtonStyles = EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    width: 44,
  },
  image: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },
});

export const iconLabelButtonStyles = EStyleSheet.create({
  $centeredStyle: {
    fontSize: 10,
    marginLeft: 10,
  },

  $horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  $verticalContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    width: (VIEW_WIDTH - 100) / 2,
    paddingTop: 15,
    paddingBottom: 15,
  },
  containerCentered: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  image: {
    width: 25,
    height: 25,
  },
  label: {
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 13,
  },
});

export const imagePickerButtonStyles = EStyleSheet.create({
  imagePickerImage: {
    width: (VIEW_WIDTH - 16) / 3,
    height: (VIEW_WIDTH - 16) / 3,
    resizeMode: 'cover',
    marginLeft: 4,
    marginBottom: 4,
    borderColor: COLORS.white,
  },
  videoDuration: {
    color: '$white',
    position: 'absolute',
    bottom: 6,
    left: 6,
  },
});

export const albumButtonStyles = EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$backgroundGray',
    width: (VIEW_WIDTH - 16) / 3,
    height: (VIEW_WIDTH - 16) / 3,
    marginLeft: 4,
    marginBottom: 4,
    paddingLeft: 4,
    paddingRight: 4,
  },
  title: {
    textAlign: 'center',
    fontSize: 10,
    paddingBottom: 12,
  },
  assetCount: {
    fontSize: 14,
  },
});

export const switchButtonStyles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  textView: {
    width: '80%',
  },
});
