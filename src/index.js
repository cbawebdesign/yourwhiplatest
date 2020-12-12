import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import OneSignal from 'react-native-onesignal';

import NavigationContainer from './config/routes';
import {
  COLORS,
  ENABLE_ONESIGNAL_PRIVACY_CONSENT,
  ONESIGNAL_APP_ID,
} from './config/constants';

import store from './config/store';

export default function App() {
  const oneSignalInit = () => {
    // Remove this method to stop OneSignal Debugging
    OneSignal.setLogLevel(6, 0);

    OneSignal.setRequiresUserPrivacyConsent(ENABLE_ONESIGNAL_PRIVACY_CONSENT);

    OneSignal.init(ONESIGNAL_APP_ID, {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
      kOSSSettingsKeyPromptBeforeOpeningPushURL: false,
    });
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);
  };

  useEffect(() => {
    oneSignalInit();

    return () => {
      OneSignal.removeEventListener('received', onReceived);
      OneSignal.removeEventListener('opened', onOpened);
      OneSignal.removeEventListener('ids', onIds);
    };
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}

const onReceived = (notification) => {
  console.log('Notification received: ', notification);
};

const onOpened = (openResult) => {
  console.log('Message: ', openResult.notification.payload.body);
  console.log('Data: ', openResult.notification.payload.additionalData);
  console.log('isActive: ', openResult.notification.isAppInFocus);
  console.log('openResult: ', openResult);
};

const onIds = (device) => {
  console.log('Device info: ', device);
};

EStyleSheet.build({
  $primary1: COLORS.primary1,
  $primary2: COLORS.primary2,
  $backgroundGray: COLORS.primaryBackground,
  $black: COLORS.black,
  $white: COLORS.white,
  $searchBar: COLORS.lightGray,
});
