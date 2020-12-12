import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ScrollView } from 'react-native';
import OneSignal from 'react-native-onesignal';

import ContainerView from '../../UI/views/ContainerView';
import FooterView from '../../UI/views/footer/FooterView';
import TextButton from '../../UI/buttons/TextButton';
import {
  CustomText as Text,
  BODY_FONT,
  TITLE_FONT,
} from '../../UI/text/CustomText';

import { signupStep3 } from '../../actions/auth';
import SwitchButton from '../../UI/buttons/SwitchButton';

import styles from '../styles';

import { TERMS } from '../../helpers/dataHelper';
import { ENABLE_ONESIGNAL_PRIVACY_CONSENT } from '../../config/constants';

const paragraphStyle = {
  paddingBottom: 12,
  fontSize: 15,
};

const SignupStep3 = ({ route }) => {
  const dispatch = useDispatch();

  const [oneSignalAgree, setOneSignalAgree] = useState(false);

  const handleAgree = () => {
    OneSignal.provideUserConsent(oneSignalAgree);
    dispatch(signupStep3(oneSignalAgree));
  };

  return (
    <ContainerView
      headerHeight={route.params.headerHeight}
      touchEnabled={false}
      backgroundColor={styles.$background}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 12,
          paddingBottom: 48,
          paddingTop: 48,
        }}
      >
        <Text
          text="App Terms of Use"
          fontFamily={TITLE_FONT}
          style={{ fontSize: 24 }}
        />
        <Text
          text="By tapping 'I Agree', you agree to our Terms of Use"
          fontFamily={BODY_FONT}
          style={{ paddingBottom: 48, fontSize: 15 }}
        />
        <Text
          text={TERMS.termsPar1}
          fontFamily={BODY_FONT}
          style={paragraphStyle}
        />
        <Text
          text={TERMS.termsPar2}
          fontFamily={BODY_FONT}
          style={paragraphStyle}
        />
        <Text
          text={TERMS.termsPar3}
          fontFamily={BODY_FONT}
          style={paragraphStyle}
        />
        <Text
          text={TERMS.termsPar4}
          fontFamily={BODY_FONT}
          style={paragraphStyle}
        />
        <Text
          text={TERMS.termsPar5}
          fontFamily={BODY_FONT}
          style={paragraphStyle}
        />
        <Text
          text={TERMS.termsPar6}
          fontFamily={BODY_FONT}
          style={paragraphStyle}
        />
        <Text
          text={TERMS.termsPar7}
          fontFamily={BODY_FONT}
          style={paragraphStyle}
        />
        <Text
          text={TERMS.termsPar8}
          fontFamily={BODY_FONT}
          style={paragraphStyle}
        />
        <Text
          text={TERMS.termsPar9}
          fontFamily={BODY_FONT}
          style={paragraphStyle}
        />
        <Text
          text={TERMS.termsPar10}
          fontFamily={BODY_FONT}
          style={paragraphStyle}
        />
        <Text
          text={TERMS.termsPar11}
          fontFamily={BODY_FONT}
          style={paragraphStyle}
        />
      </ScrollView>
      <FooterView
        backgroundColor="white"
        height={ENABLE_ONESIGNAL_PRIVACY_CONSENT ? 130 : 60}
        padding
      >
        {ENABLE_ONESIGNAL_PRIVACY_CONSENT && (
          <SwitchButton
            title="Notifications privacy consent"
            subtitle="Your consent is required in order to receive notifications in this app"
            onChange={(value) => setOneSignalAgree(value)}
            switchValue={oneSignalAgree}
          />
        )}
        <TextButton
          text="I Agree"
          onPress={handleAgree}
          color="black"
          uppercase
          opacity={1}
        />
      </FooterView>
    </ContainerView>
  );
};

export default SignupStep3;
