import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Platform } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';
import { AnimatedSectionList, AnimationType } from 'flatlist-intro-animations';
import * as Linking from 'expo-linking';

import ContainerView from '../UI/views/ContainerView';
import SettingsListItem from '../UI/lists/SettingsListItem';
import { CustomText as Text, TITLE_FONT } from '../UI/text/CustomText';
import FooterView from '../UI/views/footer/FooterView';
import TextButton from '../UI/buttons/TextButton';
import SelectionModal from '../UI/modals/SelectionModal';

import { SETTINGS_ITEMS } from '../helpers/dataHelper';

import { userPropType } from '../config/propTypes';

import { logout, deleteAccount, resetMessages } from '../actions/auth';
import {
  updateSettings,
  updateNotificationSettings,
  displayNotificationsModal,
  setOnesignalConsent,
} from '../actions/user';

import styles from './styles';
import { removeOneSignalExternalUserId } from '../helpers/socialHelpers';

const Settings = ({
  route,
  navigation,
  currentUser,
  appSettings,
  fetching,
  showNotificationsModal,
  onesignalConsent,
}) => {
  const dispatch = useDispatch();
  const paddingBottom = useSafeArea().bottom;

  const [showModal, setShowModal] = useState(false);
  const [userSettings, setUserSettings] = useState(null);

  const modalOptions = {
    title: 'Delete Account',
    body: 'You are about to delete your account. Do you want to continue?',
    buttonStyle: 'horizontal',
    buttons: [
      {
        title: 'Continue',
        onPress: () => {
          setShowModal(false);
          dispatch(deleteAccount(currentUser._id, 'SETTINGS'));
          removeOneSignalExternalUserId();
        },
      },
      {
        title: 'Cancel',
        onPress: () => {
          setShowModal(false);
        },
      },
    ],
  };

  const notificationsConsentModalOptions = {
    title: 'Notifications Privacy Consent',
    body: `Your consent is required in order to receive notifications in this app.`,
    buttonStyle: 'horizontal',
    buttons: [
      {
        title: 'Give consent',
        onPress: () => {
          dispatch(setOnesignalConsent(true));
          dispatch(displayNotificationsModal(false));
        },
      },
      {
        title: 'Cancel',
        onPress: () => {
          dispatch(updateNotificationSettings(false));
          dispatch(displayNotificationsModal(false));
        },
      },
    ],
  };

  const notificationsModalOptions = {
    title: 'Notification Settings',
    body: `Your device's notification settings are currently set to 'Off'. Press 'Settings', enable notifications and try again.`,
    buttonStyle: 'horizontal',
    buttons: [
      {
        title: 'Settings',
        onPress: () => {
          dispatch(updateNotificationSettings(false));
          dispatch(displayNotificationsModal(false));
          if (Platform.OS === 'android') {
            Linking.openSettings();
          } else {
            Linking.openURL('app-settings:');
          }
        },
      },
      {
        title: 'Cancel',
        onPress: () => {
          dispatch(updateNotificationSettings(false));
          dispatch(displayNotificationsModal(false));
        },
      },
    ],
  };

  const handlePress = (item) => {
    if (item.title === 'Remove Account') {
      setShowModal(true);
    } else {
      if (item.title === 'Edit Profile') {
        // RESET SUCCESS / ERROR STATE OTHERWISE WE GET IMMEDIATELY
        // NAVIGATED BACK TO THIS SCREEN FROM EDIT PROFILE (SIGNUP STEP 2) SCREEN
        dispatch({ type: 'RESET_PROFILE' });
      }
      navigation.navigate(item.navigateTo, { fromScreen: 'SETTINGS' });
    }
  };

  const handleLogout = () => {
    dispatch(resetMessages());
    dispatch(logout());
  };

  const handleToggleSettings = (settings) => {
    dispatch(updateSettings(settings));
  };

  useEffect(() => {
    if (!currentUser) return;

    setUserSettings(currentUser.settings);
  }, [currentUser.settings]);

  if (!currentUser) {
    return (
      <ContainerView
        touchEnabled={false}
        headerHeight={route.params.headerHeight}
        loadingOptions={{ loading: fetching }}
      />
    );
  }

  return (
    <ContainerView
      touchEnabled={false}
      headerHeight={route.params.headerHeight}
      loadingOptions={{ loading: fetching }}
    >
      <SelectionModal
        showModal={showModal || (onesignalConsent && showNotificationsModal)}
        options={showModal ? modalOptions : notificationsModalOptions}
        timeout={500}
        onModalDismissPress={() => setShowModal(false)}
      />
      <SelectionModal
        showModal={showNotificationsModal && !onesignalConsent}
        options={notificationsConsentModalOptions}
        timeout={500}
        onModalDismissPress={() => null}
      />
      <AnimatedSectionList
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: paddingBottom + 25 },
        ]}
        sections={SETTINGS_ITEMS}
        animationType={
          userSettings && userSettings.enableIntroAnimations
            ? AnimationType.SlideFromRight
            : AnimationType.None
        }
        renderItem={({ item, index, section }) => (
          <SettingsListItem
            bottomMargin={section.data.length === index + 1}
            item={item}
            onPress={() => handlePress(item)}
            toggleSettings={handleToggleSettings}
            settingsValue={currentUser.settings}
            hide={
              item.type === 'ENABLE_SUGGESTIONS' &&
              !appSettings.enableSuggestionsControl
            }
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionTitleView}>
            <Text
              text={title}
              fontFamily={TITLE_FONT}
              style={styles.sectionTitleSmall}
            />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <FooterView hasGradient>
        <TextButton
          text="Logout"
          onPress={handleLogout}
          color="black"
          uppercase
          opacity={1}
        />
      </FooterView>
    </ContainerView>
  );
};

Settings.defaultProps = {
  currentUser: null,
};

Settings.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: userPropType,
  appSettings: PropTypes.shape({
    enableSuggestionsControl: PropTypes.bool.isRequired,
  }).isRequired,
  onesignalConsent: PropTypes.bool.isRequired,
  fetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const {
    user,
    appSettings,
    showNotificationsModal,
    onesignalConsent,
  } = state.user;
  const { fetching } = state.auth;

  return {
    currentUser: user,
    appSettings,
    fetching,
    showNotificationsModal,
    onesignalConsent,
  };
};

export default connect(mapStateToProps)(Settings);
