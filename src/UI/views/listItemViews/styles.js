import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, Platform } from 'react-native';

import {
  OUTER_CONTAINER_MARGIN_LEFT_RIGHT,
  INNER_CONTAINER_MARGIN_LEFT_RIGHT,
} from '../../../config/constants';

const VIEW_WIDTH = Dimensions.get('window').width;

// const MARGIN_LEFT_RIGHT = 32;

export const headerViewStyles = EStyleSheet.create({
  $gradientColorFrom: '$primary1',
  $gradientColorTo: '$primary2',
  $sharedItemViewWidth: VIEW_WIDTH - 72,

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    width: '100%',
  },
  titleView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 25,
  },
  name: {
    fontSize: 14,
    letterSpacing: 1,
  },
  dataView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 4,
  },
  dataDetailView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 25,
  },
  dataIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
    opacity: 0.3,
  },
  time: {
    fontSize: 10,
    opacity: 0.3,
    letterSpacing: 1,
  },
});

export const commentSocialViewStyles = EStyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    width: VIEW_WIDTH - 64 - 82,
    marginLeft: 62,
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  number: {
    fontSize: 12,
    marginRight: 4,
  },
  label: {
    fontSize: 12,
    textTransform: 'uppercase',
    opacity: 0.4,
  },
});

export const multiTextViewStyles = EStyleSheet.create({
  text: {
    fontSize: 13,
  },
});

export const mediaViewStyles = EStyleSheet.create({
  $smallImageWidth: (VIEW_WIDTH - OUTER_CONTAINER_MARGIN_LEFT_RIGHT) / 3,
  $smallImageHeight: (VIEW_WIDTH - OUTER_CONTAINER_MARGIN_LEFT_RIGHT) / 3,
  $singleLargeImageWidth: VIEW_WIDTH - OUTER_CONTAINER_MARGIN_LEFT_RIGHT,
  $singleLargeImageHeight:
    ((VIEW_WIDTH - OUTER_CONTAINER_MARGIN_LEFT_RIGHT) / 3) * 2,
  $doubleImageWidth: (VIEW_WIDTH - OUTER_CONTAINER_MARGIN_LEFT_RIGHT) / 2,
  $doubleImageHeight:
    ((VIEW_WIDTH - OUTER_CONTAINER_MARGIN_LEFT_RIGHT) / 3) * 2,
  $multipleLargeImageWidth:
    ((VIEW_WIDTH - OUTER_CONTAINER_MARGIN_LEFT_RIGHT) / 3) * 2,
  $multipleLargeImageHeight:
    ((VIEW_WIDTH - OUTER_CONTAINER_MARGIN_LEFT_RIGHT) / 3) * 2,

  container: {
    flexWrap: 'wrap',
    height: '$singleLargeImageHeight',
    width: VIEW_WIDTH - OUTER_CONTAINER_MARGIN_LEFT_RIGHT,
  },
  video: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '$singleLargeImageHeight',
    width: VIEW_WIDTH - OUTER_CONTAINER_MARGIN_LEFT_RIGHT,
  },
  image: {
    resizeMode: 'cover',
  },
  photoNumberView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: 999,
  },
  photoNumber: {
    color: 'white',
    fontSize: 20,
  },
  captionGradientView: {
    position: 'absolute',
    justifyContent: 'flex-end',
    width: '$singleLargeImageWidth',
    height: 100,
    bottom: 0,
  },
  caption: {
    color: '$white',
    paddingLeft: 40,
    paddingRight: 25,
    paddingBottom: 12,
    opacity: 0.8,
  },
  soundIcon: {
    position: 'absolute',
    left: 12,
    top: 12,
    width: 18,
    height: 18,
    tintColor: '$white',
    resizeMode: 'contain',
  },
});

export const feedSocialViewStyles = EStyleSheet.create({
  $active: { opacity: 1 },
  $inactive: { opacity: 0.2 },

  // DUE TO SIZE OF LOTTIE ANIMATION VIEW
  // SOME POSITION FIXES ARE REQUIRED
  // $likesText: { marginLeft: -5 },
  // $fixLikesPosition: { marginLeft: -30 },
  // $fixCommentsPosition: { marginLeft: 20 },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    height: 65,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '$white',
  },
  socialView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: 60,
  },
  lottieView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: Platform.OS === 'ios' ? 25 : 45,
  },
  lottie: {
    position: 'absolute',
    left: -20,
    width: 100,
    backgroundColor: 'transparent',
    opacity: 0.4,
  },
  socialIcon: {
    width: 25,
    height: 25,
    opacity: 0.2,
  },
  socialText: {
    opacity: 0.2,
  },
});

export const listItemContainerViewStyles = EStyleSheet.create({
  $contentInRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  $replyBackground: '$backgroundGray',

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: VIEW_WIDTH,
    marginTop: 12,
    marginBottom: 12,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    width: VIEW_WIDTH - INNER_CONTAINER_MARGIN_LEFT_RIGHT,
    backgroundColor: '$white',
    shadowColor: '$black',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default {
  headerViewStyles,
  commentSocialViewStyles,
  multiTextViewStyles,
  feedSocialViewStyles,
  mediaViewStyles,
  listItemContainerViewStyles,
};
