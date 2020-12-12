import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, StyleSheet } from 'react-native';

import {
  INNER_CONTAINER_MARGIN_LEFT_RIGHT,
  OUTER_CONTAINER_MARGIN_LEFT_RIGHT,
} from '../../config/constants';

const VIEW_WIDTH = Dimensions.get('window').width;

export const exploreListItemStyles = EStyleSheet.create({
  $sharedViewBodyTextWidth: VIEW_WIDTH - 50,

  sharedPostView: {
    backgroundColor: '$white',
    marginTop: 25,
    shadowColor: 'black',
    shadowOffset: {
      width: 5,
      height: 0,
    },
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '$backgroundGray',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  bodyTextView: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingLeft: 40,
    paddingRight: 25,
    marginBottom: -25,
  },
  emptyBodyView: {
    height: 12,
  },
  bodyText: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 50,
    alignSelf: 'flex-start',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export const commentListItemStyles = EStyleSheet.create({
  comment: {
    width: VIEW_WIDTH - 64 - 82,
    marginTop: 25,
    marginLeft: 40,
    marginRight: 25,
    opacity: 0.8,
    fontSize: 16,
  },
  descriptionView: {
    minHeight: 45,
  },
  border: {
    width: VIEW_WIDTH - 40 - 82,
    marginLeft: 40,
    marginTop: 12,
    height: 1,
    backgroundColor: '$black',
    opacity: 0.2,
  },
});

export const galleryListItemStyles = EStyleSheet.create({
  $containerHeight: 220,
  $thumbnailImage: { height: 75 },

  innerContainerCover: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  innerContainerDetail: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width:
      VIEW_WIDTH -
      OUTER_CONTAINER_MARGIN_LEFT_RIGHT -
      INNER_CONTAINER_MARGIN_LEFT_RIGHT,
    height: 170,
    backgroundColor: '$white',
  },
  coverImageView: {
    flex: 1,
    backgroundColor: 'lightgray',
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    width:
      VIEW_WIDTH -
      OUTER_CONTAINER_MARGIN_LEFT_RIGHT -
      INNER_CONTAINER_MARGIN_LEFT_RIGHT,
    height: 170,
  },
  headerView: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  buttonView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    paddingLeft: 25,
    paddingRight: 25,
    width: '100%',
  },
});

export const peopleListItemStyles = EStyleSheet.create({
  $gradientColorFrom: '$primary1',
  $gradientColorTo: '$primary2',
  $containerheight: 85,

  container: {
    flex: 1,
    flexDirection: 'row',
    height: '100%',
  },
  profileImageView: {
    alignSelf: 'flex-start',
  },
  infoView: {
    flex: 1,
    flexDirection: 'row',
  },
  gradientView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 85,
    height: '100%',
  },
  profileImage: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  nameView: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 25,
    paddingRight: 25,
  },
  name: {
    fontSize: 15,
  },
  description: {
    fontSize: 10,
    opacity: 0.5,
  },
  followIcon: {
    width: 25,
    height: 25,
  },
  deleteView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 85,
    height: 85,
    marginTop: 10,
  },
  deleteText: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
});

export const timelineListItemStyles = EStyleSheet.create({
  $gradientColorFrom: '$primary1',
  $gradientColorTo: '$primary2',
  $containerHeight: 85,

  gradientView: {
    width: 60,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoView: {
    flex: 1,
    width: VIEW_WIDTH - 64,
    paddingLeft: 25,
  },
  headerView: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bodyView: {
    height: 45,
    paddingRight: 40,
  },
  timeView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
  },
  time: {
    fontSize: 12,
    opacity: 0.5,
  },
  socialIcon: {
    width: 25,
    height: 25,
  },
});

export const settingsListItemStyles = EStyleSheet.create({
  $containerHeight: 70,
  $activeBackground: '$primary1',
  $inactiveBackground: '$backgroundGray',

  icon: {
    width: 20,
    height: 20,
    marginRight: 25,
    marginLeft: 25,
    tintColor: '$black',
  },
  title: {
    flex: 1,
    fontSize: 14,
    textAlign: 'left',
  },
  rightSideItem: {
    paddingLeft: 12,
    paddingRight: 12,
  },
  linked: {
    width: 50,
    fontSize: 9,
    textAlign: 'center',
  },
});

export const photoListItemStyles = EStyleSheet.create({
  $containerHeight: 200,

  photo: {
    alignSelf: 'center',
    width: VIEW_WIDTH - 32,
    height: 300,
    resizeMode: 'cover',
  },
});

export const searchListItemStyles = EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  icon: {
    width: 25,
    height: 25,
    opacity: 0.3,
    marginLeft: 12,
    marginRight: 12,
  },
  title: {
    flex: 1,
  },
});
