import React from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { View, Image } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import IconButton from '../UI/buttons/IconButton';
import {
  CustomText as Text,
  TITLE_FONT,
  BODY_FONT,
} from '../UI/text/CustomText';

import {
  LOGIN,
  SIGNUP_STEP_1,
  SIGNUP_STEP_2,
  HELP,
  CODE,
  PASSWORD,
  CAMERA,
  WALKTHROUGH,
  DISCOVER,
  MEDIA_ALBUMS,
  MEDIA,
  EXPLORE,
  GALLERY,
  GALLERY_DETAIL,
  PROFILE,
  PEOPLE,
  TIMELINE,
  SETTINGS,
  STATS,
  EXPLORE_DETAIL,
  COMPOSE,
  NAVIGATION,
  COMMENTS,
  SEARCH,
  REPLIES,
  SIGNUP_STEP_3,
} from '../config/constants';

const closeIcon = require('../../assets/icons/close.png');
const menuIcon = require('../../assets/icons/menu.png');
const composeIcon = require('../../assets/icons/compose.png');
const searchIcon = require('../../assets/icons/search.png');
const backIcon = require('../../assets/icons/back.png');

const styles = EStyleSheet.create({
  $tintColor: '$black',
  $background: '$backgroundGray',

  header: {
    fontSize: 14,
    letterSpacing: 3,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  subHeader: {
    textAlign: 'center',
  },
});

export const getHeaderTitleHelper = (route, navigation, currentUser = null) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Start';

  const stack = navigation.dangerouslyGetState().routes[
    navigation.dangerouslyGetState().index
  ];

  const childStack = stack.state && stack.state.routes[stack.state.index];

  const grandchildStack =
    childStack &&
    childStack.state &&
    childStack.state.routes[childStack.state.index];

  switch (routeName) {
    case 'Start':
    case 'Main':
      if (
        grandchildStack &&
        (grandchildStack.name === EXPLORE_DETAIL ||
          grandchildStack.name === GALLERY_DETAIL)
      ) {
        return {
          text: grandchildStack.params.title,
        };
      }
      if (stack.name === WALKTHROUGH) {
        return { text: WALKTHROUGH };
      }
      if (stack.name === 'Popup') {
        if (childStack && childStack.name === 'Main') {
          if (grandchildStack && grandchildStack.name === PASSWORD) {
            return {
              view: (
                <>
                  <Text
                    text="Password Reset"
                    fontFamily={TITLE_FONT}
                    style={styles.header}
                  />
                  <Text
                    text="Enter a combination of at least 8 characters"
                    fontFamily={BODY_FONT}
                    style={styles.subHeader}
                  />
                </>
              ),
            };
          }
          return {
            text: grandchildStack ? grandchildStack.name : EXPLORE,
          };
        }
        return { text: EXPLORE };
      }
      return { text: '' };
    case COMPOSE:
      return {
        text: childStack && childStack.params.editPost ? 'Edit' : COMPOSE,
      };
    case LOGIN:
    case CAMERA:
      return { text: '' };
    case SIGNUP_STEP_2:
      if (stack && (stack.name === WALKTHROUGH || stack.name === 'Popup')) {
        return '';
      }
      return { text: childStack && childStack.params.title };
    case HELP:
      return {
        view: (
          <>
            <Text
              text="Find Your Account"
              fontFamily={TITLE_FONT}
              style={styles.header}
            />
            <Text
              text="Enter email to search for your account"
              fontFamily={BODY_FONT}
              style={styles.subHeader}
            />
          </>
        ),
      };
    case CODE:
      return {
        view: (
          <>
            <Text
              text="Enter Your Code"
              fontFamily={TITLE_FONT}
              style={styles.header}
            />
            <Text
              text="Enter code to retrieve your account"
              fontFamily={BODY_FONT}
              style={styles.subHeader}
            />
          </>
        ),
      };
    case PASSWORD:
      return {
        view: (
          <>
            <Text
              text="Password Reset"
              fontFamily={TITLE_FONT}
              style={styles.header}
            />
            <Text
              text="Enter a combination of at least 8 characters"
              fontFamily={BODY_FONT}
              style={styles.subHeader}
            />
          </>
        ),
      };
    case NAVIGATION:
      return {
        view: (
          <>
          <Image source={require('../../assets/images/capture-2.png')} style={{
            marginTop:50,
  
            alignItems: "center"
            
            }} />

            {currentUser && currentUser.isAdmin && (
              <Text
                fontFamily={BODY_FONT}
                style={styles.subHeader}
              />
            )}
          </>
        ),
      };
    case 'ImagePicker':
      return { text: MEDIA_ALBUMS };
    case DISCOVER:
      return { text: WALKTHROUGH };
    case PROFILE:
      return { text: 'My profile' };
    case COMMENTS:
    case REPLIES:
      return {
        text: childStack && childStack.params ? childStack.params.title : '',
      };
    case SEARCH:
      return null;
    default:
      return { 

        view: (

          <Image source={require('../../assets/icons/back.png')}  />
                  )


       };
  }
};

export const getHeaderLeftHelper = (route, navigation) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Start';
  const stack = navigation.dangerouslyGetState().routes[
    navigation.dangerouslyGetState().index
  ];

  const childStack = stack.state && stack.state.routes[stack.state.index];

  const grandchildStack =
    childStack &&
    childStack.state &&
    childStack.state.routes[childStack.state.index];

  switch (routeName) {
    case 'Start':
    case 'Main':
      if (
        grandchildStack &&
        (grandchildStack.name === EXPLORE_DETAIL ||
          grandchildStack.name === GALLERY_DETAIL)
      ) {
        return (
          <IconButton
            icon={backIcon}
            onPress={() => navigation.goBack()}
            size={16}
          />
        );
      }
      if (stack.name === 'Popup') {
        if (
          grandchildStack &&
          (grandchildStack.name === SIGNUP_STEP_2 ||
            grandchildStack.name === PASSWORD)
        ) {
          return (
            <IconButton
              icon={backIcon}
              onPress={() => navigation.goBack()}
              size={16}
            />
          );
        }
        return (
          <IconButton
            icon={menuIcon}
            onPress={() =>
              navigation.navigate('Popup', {
                ...route.params,
                screen: NAVIGATION,
              })
            }
          />
        );
      }
      break;
    case LOGIN:
      return null;
    case NAVIGATION:
    case COMPOSE:
    case CAMERA:
    case COMMENTS:
    case SEARCH:
    case REPLIES:
    case 'ImagePicker':
      if (grandchildStack && grandchildStack.name === MEDIA) {
        return (
          <IconButton
            icon={backIcon}
            onPress={() =>
              navigation.navigate('ImagePicker', { screen: MEDIA_ALBUMS })
            }
            size={16}
          />
        );
      }

      return (
        <IconButton
          icon={closeIcon}
          onPress={() => navigation.goBack()}
          size={24}
        />
      );
    case SIGNUP_STEP_1:
    case SIGNUP_STEP_2:
    case SIGNUP_STEP_3:
    case HELP:
    case CODE:
    case PASSWORD:
    case DISCOVER:
      if (
        childStack &&
        childStack.params &&
        childStack.params.fromScreen === NAVIGATION
      ) {
        return null;
      }

      return (
        <IconButton
          icon={backIcon}
          onPress={() => navigation.goBack()}
          size={16}
        />
      );
    default:
      break;
  }
};

export const getHeaderRightHelper = (route, navigation, currentUser) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Start';
  const stack = navigation.dangerouslyGetState().routes[
    navigation.dangerouslyGetState().index
  ];
  const childstack = stack.state && stack.state.routes[stack.state.index];
  const screen =
    childstack &&
    childstack.state &&
    childstack.state.routes[childstack.state.index].name;

  switch (routeName) {
    case 'Start':
    case 'Main':
      if (stack.name === 'Popup') {
        if (
          screen === PEOPLE ||
          screen === GALLERY ||
          screen === GALLERY_DETAIL ||
          screen === TIMELINE ||
          screen === PROFILE ||
          screen === STATS ||
          screen === SETTINGS
        ) {
          return (
            <IconButton
              icon={searchIcon}
              onPress={() => navigation.navigate(SEARCH)}
            />
          );
        }

        if (screen === SIGNUP_STEP_2 || screen === PASSWORD) {
          return null;
        }

        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <IconButton
              icon={composeIcon}
              onPress={() => navigation.navigate(COMPOSE)}
            />
            <IconButton
              icon={searchIcon}
              onPress={() => navigation.navigate(SEARCH)}
            />
          </View>
        );
      }
      break;
    case NAVIGATION:
    case COMPOSE:
      if (
        currentUser &&
        currentUser.profileImage &&
        currentUser.profileImage.length > 0
      ) {
        return (
          <IconButton
            icon={{
              uri: currentUser.profileImage,
            }}
            onPress={() =>
              navigation.navigate(PROFILE, {
                ...route.params,
                user: currentUser,
              })
            }
            tintColor={null}
          />
        );
      }
      break;
    default:
      break;
  }
};
