import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator, useHeaderHeight } from '@react-navigation/stack';
import EStyleSheet from 'react-native-extended-stylesheet';
import * as SecureStore from 'expo-secure-store';
import branch from 'react-native-branch';
import * as Linking from 'expo-linking';

import { CustomText as Text, TITLE_FONT } from '../UI/text/CustomText';

import Login from '../screens/auth/Login';
import SignupStep1 from '../screens/auth/SignupStep1';
import SignupStep2 from '../screens/auth/SignupStep2';
import SignupStep3 from '../screens/auth/SignupStep3';
import Help from '../screens/auth/Help';
import Code from '../screens/auth/Code';
import Password from '../screens/auth/Password';

import WalkthroughStep1 from '../screens/walkthrough/WalkthroughStep1';
import WalkthroughStep2 from '../screens/walkthrough/WalkthroughStep2';

import Explore from '../screens/explore/Explore';
import Gallery from '../screens/gallery/Gallery';
import GalleryDetail from '../screens/gallery/GalleryDetail';
import Profile from '../screens/Profile';
import People from '../screens/people/People';
import Timeline from '../screens/Timeline';
import Settings from '../screens/Settings';
import Stats from '../screens/stats/Stats';
import ExploreDetail from '../screens/explore/ExploreDetail';
import Replies from '../screens/Replies';
import Flagged from '../screens/flagged/Flagged';

import Search from '../screens/Search';
import Navigation from '../screens/Navigation';
import Compose from '../screens/Compose';
import Comments from '../screens/Comments';
import Camera from '../screens/Camera';
import ImagePicker from '../screens/imagePicker/ImagePicker';
import ImagePickerDetail from '../screens/imagePicker/ImagePickerDetail';

import {
  getHeaderTitleHelper,
  getHeaderRightHelper,
  getHeaderLeftHelper,
} from '../helpers/routeHelpers';

import { storeToken, routeChecksComplete } from '../actions/auth';
import { getUserInfo, setWalkthroughComplete } from '../actions/user';
import { setDeepLinkSlug } from '../actions/general';

import { userPropType } from './propTypes';
import {
  LOGIN,
  SIGNUP_STEP_1,
  SIGNUP_STEP_2,
  SIGNUP_STEP_3,
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
  FLAGGED,
} from './constants';

// APP APPLIES 5 SEPERATE NAVIGATION STACKS
// 1) AuthNavigationStack (controls authentication screens)
// 2) WalkthroughNavigationStack (controls Walkthrough screens)
// 3) MainNavigationStack (controls all main app screens)
// 4) AppNavigationStack (controls display of and navigation between
// above three Navigation Stacks)
// 5) RootNavigationStack (controls navigation to PopUp Screens)

const AuthNavigationStack = createStackNavigator();
const WalkthroughNavigationStack = createStackNavigator();
const MainNavigationStack = createStackNavigator();
const ImagePickerStack = createStackNavigator();
const PopupNavigationStack = createStackNavigator();
const RootNavigationStack = createStackNavigator();

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
    fontSize: 12,
    textAlign: 'center',
  },
  headerRightView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const AuthStackScreen = () => {
  const headerHeight = useHeaderHeight();

  return (
    <AuthNavigationStack.Navigator headerMode="none">
      <AuthNavigationStack.Screen
        name={LOGIN}
        component={Login}
        initialParams={{ headerHeight }}
      />
      <AuthNavigationStack.Screen
        name={SIGNUP_STEP_1}
        component={SignupStep1}
        initialParams={{ headerHeight }}
      />
      <AuthNavigationStack.Screen
        name={SIGNUP_STEP_2}
        component={SignupStep2}
        initialParams={{ headerHeight }}
      />
      <AuthNavigationStack.Screen
        name={SIGNUP_STEP_3}
        component={SignupStep3}
        initialParams={{ headerHeight }}
      />
      <AuthNavigationStack.Screen
        name={HELP}
        component={Help}
        initialParams={{ headerHeight }}
      />
      <AuthNavigationStack.Screen
        name={CODE}
        component={Code}
        initialParams={{ headerHeight }}
      />
      <AuthNavigationStack.Screen
        name={PASSWORD}
        component={Password}
        initialParams={{ headerHeight }}
      />
      <AuthNavigationStack.Screen
        name="ImagePicker"
        component={ImagePickerStackStackScreen}
        initialParams={{ headerHeight }}
      />
      <AuthNavigationStack.Screen name={CAMERA} component={Camera} />
    </AuthNavigationStack.Navigator>
  );
};

const WalkthroughStackScreen = () => {
  const headerHeight = useHeaderHeight();

  return (
    <WalkthroughNavigationStack.Navigator headerMode="none">
      <WalkthroughNavigationStack.Screen
        name={WALKTHROUGH}
        component={WalkthroughStep1}
        initialParams={{ headerHeight }}
      />
      <WalkthroughNavigationStack.Screen
        name={DISCOVER}
        component={WalkthroughStep2}
        initialParams={{ headerHeight }}
      />
    </WalkthroughNavigationStack.Navigator>
  );
};

const ImagePickerStackStackScreen = ({ route }) => {
  const { headerHeight } = route.params;

  return (
    <ImagePickerStack.Navigator headerMode="none">
      <ImagePickerStack.Screen
        name={MEDIA_ALBUMS}
        component={ImagePicker}
        initialParams={{ ...route.params, headerHeight }}
      />
      <ImagePickerStack.Screen
        name={MEDIA}
        component={ImagePickerDetail}
        initialParams={{ ...route.params, headerHeight }}
      />
    </ImagePickerStack.Navigator>
  );
};

const MainStackScreen = ({ route }) => {
  const { headerHeight } = route.params;

  return (
    <MainNavigationStack.Navigator headerMode="none">
      <MainNavigationStack.Screen
        name={EXPLORE}
        component={Explore}
        initialParams={{ headerHeight }}
      />
      <MainNavigationStack.Screen
        name={FLAGGED}
        component={Flagged}
        initialParams={{ headerHeight }}
      />
      <MainNavigationStack.Screen
        name={GALLERY}
        component={Gallery}
        initialParams={{ headerHeight }}
      />
      <MainNavigationStack.Screen
        name={GALLERY_DETAIL}
        component={GalleryDetail}
        initialParams={{ headerHeight }}
      />
      <MainNavigationStack.Screen
        name={PROFILE}
        component={Profile}
        initialParams={{ headerHeight }}
      />
      <MainNavigationStack.Screen
        name={PEOPLE}
        component={People}
        initialParams={{ headerHeight }}
      />
      <MainNavigationStack.Screen
        name={TIMELINE}
        component={Timeline}
        initialParams={{ headerHeight }}
      />
      <MainNavigationStack.Screen
        name={SETTINGS}
        component={Settings}
        initialParams={{ headerHeight }}
      />
      <MainNavigationStack.Screen
        name={STATS}
        component={Stats}
        initialParams={{ headerHeight }}
      />
      <MainNavigationStack.Screen
        name={EXPLORE_DETAIL}
        component={ExploreDetail}
        initialParams={{ headerHeight }}
      />
      <AuthNavigationStack.Screen
        name={PASSWORD}
        component={Password}
        initialParams={{ headerHeight }}
      />
      <MainNavigationStack.Screen
        name={SIGNUP_STEP_2}
        component={SignupStep2}
        initialParams={{ headerHeight }}
      />
    </MainNavigationStack.Navigator>
  );
};

const PopupStackScreen = () => {
  const headerHeight = useHeaderHeight();

  return (
    <PopupNavigationStack.Navigator mode="modal" headerMode="none">
      <PopupNavigationStack.Screen
        name="Main"
        component={MainStackScreen}
        initialParams={{ headerHeight }}
      />
      <PopupNavigationStack.Screen
        name={COMPOSE}
        component={Compose}
        initialParams={{ headerHeight }}
      />
      <PopupNavigationStack.Screen
        name={NAVIGATION}
        component={Navigation}
        initialParams={{ headerHeight }}
      />
      <PopupNavigationStack.Screen
        name={COMMENTS}
        component={Comments}
        initialParams={{ headerHeight }}
      />
      <PopupNavigationStack.Screen
        name={CAMERA}
        component={Camera}
        initialParams={{ headerHeight }}
      />
      <PopupNavigationStack.Screen
        name={SEARCH}
        component={Search}
        options={{
          headerLeft: () => null,
        }}
        initialParams={{ headerHeight }}
      />
      <PopupNavigationStack.Screen
        name="ImagePicker"
        component={ImagePickerStackStackScreen}
        initialParams={{ headerHeight }}
      />
      <PopupNavigationStack.Screen
        name={REPLIES}
        component={Replies}
        initialParams={{ headerHeight }}
      />
    </PopupNavigationStack.Navigator>
  );
};

const RootStackScreen = ({ authToken, walkthroughComplete, currentUser }) => {
  const dispatch = useDispatch();

  const getToken = async () => {
    const tokenString = await SecureStore.getItemAsync('token');
    const isWalkthroughComplete = await SecureStore.getItemAsync(
      'walkthroughComplete'
    );

    // FOR DEV PURPOSES ONLY
    // const tokenString = await SecureStore.deleteItemAsync('token');
    // await SecureStore.deleteItemAsync('walkthroughComplete');
    // END FOR DEV PURPOSES ONLY

    if (tokenString) {
      dispatch(storeToken(tokenString));
    }
    if (isWalkthroughComplete) {
      dispatch(setWalkthroughComplete());
    }

    // DISABLE LOADER
    dispatch(routeChecksComplete());
  };

  useEffect(() => {
    if (authToken === null) {
      getToken();
    } else {
      dispatch(getUserInfo(authToken));
    }
  }, [authToken]);

  return (
    <RootNavigationStack.Navigator>
      {!authToken && (
        <RootNavigationStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={({ route, navigation }) => ({
            headerTransparent: true,
            headerLeft: () => getHeaderLeftHelper(route, navigation),
            headerTitle: () => {
              if (getHeaderTitleHelper(route, navigation).view) {
                return getHeaderTitleHelper(route, navigation).view;
              }

              return (
                <Text
                  text={getHeaderTitleHelper(route, navigation).text}
                  fontFamily={TITLE_FONT}
                  style={styles.header}
                />
              );
            },
          })}
        />
      )}
      {!walkthroughComplete && (
        <RootNavigationStack.Screen
          name="Walkthrough"
          component={WalkthroughStackScreen}
          options={({ route, navigation }) => ({
            headerTransparent: true,
            headerLeft: () => getHeaderLeftHelper(route, navigation),
            headerTitle: () => (
              <Text
                text={getHeaderTitleHelper(route, navigation).text}
                fontFamily={TITLE_FONT}
                style={styles.header}
              />
            ),
          })}
        />
      )}
      {authToken && walkthroughComplete && (
        <RootNavigationStack.Screen
          name="Popup"
          component={PopupStackScreen}
          options={({ route, navigation }) => ({
            headerTransparent: true,
            headerLeft: () => getHeaderLeftHelper(route, navigation),
            headerRight: () =>
              getHeaderRightHelper(route, navigation, currentUser),
            headerTitle: () => {
              if (!getHeaderTitleHelper(route, navigation, currentUser)) {
                return null;
              }
              if (getHeaderTitleHelper(route, navigation, currentUser).view) {
                return getHeaderTitleHelper(route, navigation, currentUser)
                  .view;
              }

              return (
                <Text
                  text={
                    getHeaderTitleHelper(route, navigation, currentUser).text
                  }
                  fontFamily={TITLE_FONT}
                  style={styles.header}
                />
              );
            },
          })}
        />
      )}
    </RootNavigationStack.Navigator>
  );
};

const NavigationContainerStack = ({
  authToken,
  walkthroughComplete,
  currentUser,
}) => {
  const dispatch = useDispatch();

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: styles.$background,
    },
  };

  let linking;
  const getLinking = () => ({
    prefixes: ['yourwhip://'],

    // Custom function to get the URL which was used to open the app
    async getInitialURL() {
      // First, you may want to do the default deep link handling
      // Check if app was opened from a deep link
      const url = await Linking.getInitialURL();

      if (url != null) {
        return url;
      }

      // Next, you would need to get the initial URL from your third-party integration
      // It depends on the third-party SDK you use
      // For example, to get to get the initial URL for branch.io:
      const params = await branch.getFirstReferringParams();

      return params?.$canonical_url;
    },

    // Custom function to subscribe to incoming links
    subscribe(listener) {
      // First, you may want to do the default deep link handling
      const onReceiveURL = ({ url }) => listener(url);

      // Listen to incoming links from deep linking
      Linking.addEventListener('url', onReceiveURL);

      // Next, you would need to subscribe to incoming links from your third-party integration
      // For example, to get to subscribe to incoming links from branch.io:
      const branchUnsubscribe = branch.subscribe(({ error, params, uri }) => {
        if (error) {
          console.log('Error from Branch: ' + error);
          return;
        }

        // A BRANCH LINK WAS OPENED
        dispatch(setDeepLinkSlug(params.slug));

        listener(uri);
      });

      return () => {
        Linking.removeEventListener('url', onReceiveURL);
        branchUnsubscribe();
      };
    },

    config: {},
  });

  useEffect(() => {
    linking = getLinking();
    linking.subscribe((url) => {
      if (
        url &&
        url.includes('yourwhip://') &&
        !url.includes('open?link_click_id')
      ) {
        const postSlug = url.split('?')[1];
        if (postSlug.length > 0) {
          console.log('postslug', postSlug);
          dispatch(setDeepLinkSlug(postSlug));
        }
      }
    });
    linking.getInitialURL();
  }, []);

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <RootStackScreen
        authToken={authToken}
        walkthroughComplete={walkthroughComplete}
        currentUser={currentUser}
      />
    </NavigationContainer>
  );
};

NavigationContainerStack.defaultProps = {
  authToken: null,
  currentUser: null,
};

NavigationContainerStack.propTypes = {
  authToken: PropTypes.string,
  walkthroughComplete: PropTypes.bool.isRequired,
  currentUser: userPropType,
};

const mapStateToProps = (state) => {
  const { authToken } = state.auth;
  const { walkthroughComplete, user } = state.user;

  return {
    authToken,
    walkthroughComplete,
    currentUser: user,
  };
};

export default connect(mapStateToProps)(NavigationContainerStack);
