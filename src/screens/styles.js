import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

import { COLORS, INNER_CONTAINER_MARGIN_LEFT_RIGHT } from '../config/constants';
import { color } from 'react-native-reanimated';

const VIEW_WIDTH = Dimensions.get('window').width;

const styles = EStyleSheet.create({
  $innerBackgroundColor: '$white',
  $background: '$backgroundGray',
  $dark: '$black',
  $authProfileImage: { flex: 6.8 },

  $navigationInnerContainer: {
    marginTop: 25,
    alignSelf: 'center',
    paddingBottom: 100,
  },

  container: {
    flex: 1,
  },
  innerContainer: {
    width: VIEW_WIDTH - INNER_CONTAINER_MARGIN_LEFT_RIGHT,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  // KEYBOARDAVOIDINGVIEW
  emptyView: {
    flex: 1,
  },

  // FLATLIST / SECTIONLIST
  contentContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  sectionTitleView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: VIEW_WIDTH,
    height: 60,
    backgroundColor: '$backgroundGray',
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 50,
  },
  sectionTitle: {
    paddingTop: 20,
    fontSize: 25,
    textTransform: 'uppercase',
  },
  sectionTitleSmall: {
    paddingTop: 20,
    fontSize: 10,
    textTransform: 'uppercase',
    opacity: 0.5,
    alignSelf: 'flex-start',
  },
  endOfList: {
    flex: 1,
    textAlign: 'center',
    paddingBottom: 12,
    opacity: 0.5,
  },

  // SROLLVIEW
  scrollViewContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 50,
  },

  // AUTH SCREENS
  $active: { marginTop: 100 },

  topView: {
    flex: 4,
  },
  inputView: {
    flex: 5,
  },
  buttonView: {
    flex: 1,
  },

  // IMAGE PICKER
  imagePickerContentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // paddingBottom: 160,
  },

  // CUSTOMHEADER
  headerText: {
    textTransform: 'uppercase',
  },

  // FOOTERBUTTON
  footerButtonView: {
    position: 'absolute',
    width: '100%',
    height: 60,
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
