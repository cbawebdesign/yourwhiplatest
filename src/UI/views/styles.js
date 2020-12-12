import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

import {
  OUTER_CONTAINER_MARGIN_LEFT_RIGHT,
  INNER_CONTAINER_MARGIN_LEFT_RIGHT,
} from '../../config/constants';

const VIEW_WIDTH = Dimensions.get('window').width;

export const containerViewStyles = EStyleSheet.create({
  $gradientColorFrom: '$primary1',
  $gradientColorTo: '$primary2',
  $background: '$backgroundGray',

  container: {
    flex: 1,
  },
  gradientView: {
    flex: 1,
  },
});

export const logoViewStyles = EStyleSheet.create({
  $viewScaleLarge: 1,
  $viewScaleSmall: 0.75,

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    margin: 47,
  },
  title: {
    textAlign: 'center',
    color: '$white',
    fontSize: 24,
    letterSpacing: 20,
    lineHeight: 40,
    paddingLeft: 25,
    paddingRight: 25,
  },
});

export const authViewStyles = EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 50,
  },
  startButtonView: {
    marginTop: 50,
  },
});

export const authButtonViewStyles = EStyleSheet.create({
  $socialText: '$white',

  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  horizontalButtons: {
    marginTop: 12,
    marginLeft: 50,
    marginRight: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export const personalDisplayViewStyles = EStyleSheet.create({
  $gradientColorFrom: '$primary1',
  $gradientColorTo: '$primary2',

  container: {
    flex: 3,
    justifyContent: 'flex-end',
    marginLeft: 50,
    width: VIEW_WIDTH - 100,
  },
  innerContainer: {
    height: VIEW_WIDTH - 100,
  },
  gradientView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  photoButton: {
    alignSelf: 'flex-end',
    margin: 10,
  },
});

export const personalInputViewStyles = EStyleSheet.create({
  container: {
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 50,
    width: VIEW_WIDTH - 100,
  },
  startButtonView: {
    marginTop: 50,
  },
});

export const titleBodyTextViewStyles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  title: {
    fontSize: 25,
    textTransform: 'uppercase',
    letterSpacing: 3,
    marginBottom: 50,
    textAlign: 'center',
  },
  body: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export const selectionScrollViewStyles = EStyleSheet.create({
  $selected: '$black',
  $deselected: '$white',

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    marginRight: 12,
    height: 75,
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

export const commentComposeViewStyles = EStyleSheet.create({
  $selected: '$black',
  $deselected: '$white',

  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    top: 0,
    left: 0,
    width: '100%',
    padding: 12,
  },
  commentView: {
    paddingLeft: 25,
    width: '85%',
  },
  editTitle: { paddingBottom: 12 },
  input: {
    flex: 1,
    minHeight: 40,
    paddingTop: 12,
    fontSize: 15,
  },
  moreIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  composeIcon: {
    width: 25,
    height: 25,
  },
});

export const composeViewStyles = EStyleSheet.create({
  $gradientColorFrom: 'rgba(255, 255, 255, 1)',
  $gradientColorTo: 'rgba(255, 255, 255, 0)',
  $captionviewHeight: { height: 70 },

  container: {
    alignSelf: 'center',
    marginTop: 25,
    padding: OUTER_CONTAINER_MARGIN_LEFT_RIGHT,
    justifyContent: 'flex-end',
  },
  innerContainer: {
    width: VIEW_WIDTH - INNER_CONTAINER_MARGIN_LEFT_RIGHT,
    backgroundColor: '$white',
  },
  descriptionView: {
    height: 140,
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    fontSize: 14,
  },
  inputTop: {
    paddingTop: 25,
    paddingBottom: 25,
    fontSize: 16,
  },
  mediaView: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$backgroundGray',
    width: VIEW_WIDTH - OUTER_CONTAINER_MARGIN_LEFT_RIGHT,
    height: ((VIEW_WIDTH - OUTER_CONTAINER_MARGIN_LEFT_RIGHT) / 3) * 2,
  },
  galleryView: {
    position: 'absolute',
    top: 0,
    width: VIEW_WIDTH - OUTER_CONTAINER_MARGIN_LEFT_RIGHT,
    padding: 25,
    zIndex: 999,
  },
  templateImage: {
    width: VIEW_WIDTH - 210,
    height: 80,
    margin: 75,
    resizeMode: 'contain',
  },
  videoThumbnail: {
    width: VIEW_WIDTH - 100,
    height: ((VIEW_WIDTH - 50) / 3) * 2,
  },
  captionView: {
    justifyContent: 'center',
    height: 25,
  },
  image: {
    alignSelf: 'center',
    height: 220,
    width: VIEW_WIDTH - 64,
    backgroundColor: '$backgroundGray',
  },
});

export const profileImageViewStyles = EStyleSheet.create({
  $gradientColorFrom: '$primary1',
  $gradientColorTo: '$primary2',
  $largeGradientView: {
    width: VIEW_WIDTH - INNER_CONTAINER_MARGIN_LEFT_RIGHT,
    height: 230,
    justifyContent: 'center',
    alignItems: 'center',
  },
  $largeImage: {
    flex: 1,
    width: VIEW_WIDTH - INNER_CONTAINER_MARGIN_LEFT_RIGHT,
    resizeMode: 'cover',
  },
  $largeInitials: {
    fontSize: 50,
  },

  profileImage: {
    width: 40,
    height: 40,
  },
  gradientView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  initials: {
    fontSize: 10,
  },
});

export const profileInfoViewStyles = EStyleSheet.create({
  $gradientColorFrom: '$primary1',
  $gradientColorTo: '$primary2',

  container: {
    flex: 1,
    width: VIEW_WIDTH - OUTER_CONTAINER_MARGIN_LEFT_RIGHT,
    padding: 25,
    backgroundColor: '$white',
    alignSelf: 'center',
    shadowColor: '$black',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  headerView: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 12,
  },
  descriptionView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 50,
  },
  doubleLabelView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    paddingBottom: 25,
  },
  name: {
    width: VIEW_WIDTH - 50 - 50,
    fontSize: 25,
    paddingTop: 18,
  },
  gradientView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
  },
  labelItem: {
    paddingBottom: 6,
  },
  locationView: {
    width: VIEW_WIDTH - 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailView: {
    width: VIEW_WIDTH - 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    width: 12,
    height: 14,
    marginRight: 4,
  },
  emailIcon: {
    fontSize: 12,
  },
  editIcon: {
    alignSelf: 'flex-end',
  },
  label: {
    fontSize: 10,
    opacity: 0.4,
    letterSpacing: 1,
  },
  email: {
    flex: 1,
    textAlign: 'left',
  },
  description: {
    width: VIEW_WIDTH - 125,
    fontSize: 13,
    opacity: 0.5,
  },
});

export const profileSocialViewStyles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: VIEW_WIDTH - 100,
    padding: 25,
  },
  labelValueView: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 35,
  },
  label: {
    fontSize: 10,
    opacity: 0.5,
  },
  value: {
    fontSize: 10,
  },
});

export const highlightScrollViewStyles = EStyleSheet.create({
  $scrollviewItemViewWidth: VIEW_WIDTH / 3 + 40,
  $typeMonth: {
    paddingRight: 75,
    alignSelf: 'center',
  },
  $typeWeek: {
    paddingLeft: 0,
    alignSelf: 'center',
  },

  container: {},
  contentContainer: {
    paddingLeft: VIEW_WIDTH / 3 - 20,
    paddingRight: VIEW_WIDTH / 3 - 20,
  },
  scrollviewItemView: {
    alignItems: 'center',
    width: VIEW_WIDTH / 3 + 40,
  },
  scrollviewPeriod: {
    fontSize: 50,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scrollViewYear: {
    fontSize: 9,
  },
});

export const statsDataViewStyles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -75,
    zIndex: 999,
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

export const animatedDataViewStyles = EStyleSheet.create({
  $smallContainer: 0.9,
  $largeContainer: 1.1,

  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '$white',
    width: (VIEW_WIDTH - 50) / 2,
    height: 230,
    padding: 20,
    shadowColor: '$black',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 7,
  },
  dataViewHeader: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  pieChartView: {
    justifyContent: 'center',
    flex: 1,
  },
  footerText: {
    fontSize: 10,
    opacity: 0.4,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  icon: {
    width: 12,
    height: 7,
  },
  growth: {
    fontSize: 12,
    opacity: 0.4,
  },
  growthAbsolute: {
    fontSize: 50,
    textAlign: 'center',
  },
});

export const loadingViewStyles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: -50,
    right: -50,
    zIndex: 99999,
    backgroundColor: '#000000cc',
  },
});
