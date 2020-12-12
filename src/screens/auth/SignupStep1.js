import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  View,
  Keyboard,
  ImageBackground,
  ScrollView,
  Platform,
} from 'react-native';

import ContainerView from '../../UI/views/ContainerView';
import LogoView from '../../UI/views/LogoView';
import AuthInputView from '../../UI/views/AuthInputView';
import AuthButtonView from '../../UI/views/AuthButtonView';
import FooterView from '../../UI/views/footer/FooterView';
import DualTextButtonView from '../../UI/views/footer/DualTextButtonView';
import SelectionModal from '../../UI/modals/SelectionModal';

import { signupStep1, resetMessages } from '../../actions/auth';

import { useKeyboardState } from '../../config/hooks';

import styles from '../styles';

const backgroundImage = require('../../../assets/images/porsche.png');

const isIos = Platform.OS === 'ios';

const SignupStep1 = ({ route, navigation, fetching, error, success }) => {
  const dispatch = useDispatch();
  const { keyboardHeight } = useKeyboardState();

  const [firstName, setFirstname] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstNameActive, setFirstNameActive] = useState(false);
  const [lastNameActive, setLastNameActive] = useState(false);
  const [emailActive, setEmailActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [validationError, setValidationError] = useState('');

  const inputBlockOptions = [
    {
      type: 'FIRST_NAME',
      placeholder: 'First Name',
      value: firstName,
      onChangeText: (text) => handleInputChange(text, 'FIRST_NAME'),
      onPress: (type) => handleInputPress(type),
      removeKeyboard: () => handleRemoveKeyboard(),
      active: firstNameActive,
    },
    {
      type: 'LAST_NAME',
      placeholder: 'Last Name',
      value: lastName,
      onChangeText: (text) => handleInputChange(text, 'LAST_NAME'),
      onPress: (type) => handleInputPress(type),
      removeKeyboard: () => handleRemoveKeyboard(),
      active: lastNameActive,
    },
    {
      type: 'EMAIL',
      keyboardType: 'email-address',
      placeholder: 'Email',
      value: email,
      onChangeText: (text) => handleInputChange(text, 'EMAIL'),
      onPress: (type) => handleInputPress(type),
      removeKeyboard: () => handleRemoveKeyboard(),
      active: emailActive,
    },
    {
      type: 'PASSWORD',
      placeholder: 'Password',
      isPassword: true,
      value: password,
      onChangeText: (text) => handleInputChange(text, 'PASSWORD'),
      onPress: (type) => handleInputPress(type),
      removeKeyboard: () => handleRemoveKeyboard(),
      active: passwordActive,
    },
  ];

  const validationErrorOption = {
    title: 'Authentication Error',
    body: validationError,
    buttonStyle: 'horizontal',
    buttons: [
      {
        title: 'Try Again',
        onPress: () => {
          dispatch(resetMessages());
          setShowValidationError(false);
        },
      },
      {
        title: 'Sign in',
        onPress: () => navigation.navigate('Login'),
      },
    ],
  };

  const handleRemoveKeyboard = () => {
    Keyboard.dismiss();
    setEmailActive(false);
    setPasswordActive(false);
    setFirstNameActive(false);
    setLastNameActive(false);
  };

  const handleInputPress = (type) => {
    switch (type) {
      case 'FIRST_NAME':
        setFirstNameActive(true);
        setLastNameActive(false);
        setPasswordActive(false);
        setEmailActive(false);
        break;
      case 'LAST_NAME':
        setFirstNameActive(false);
        setLastNameActive(true);
        setPasswordActive(false);
        setEmailActive(false);
        break;
      case 'EMAIL':
        setFirstNameActive(false);
        setLastNameActive(false);
        setEmailActive(true);
        setPasswordActive(false);
        break;
      case 'PASSWORD':
        setFirstNameActive(false);
        setLastNameActive(false);
        setPasswordActive(true);
        setEmailActive(false);
        break;
      default:
        break;
    }
  };

  const handleInputChange = (text, type) => {
    switch (type) {
      case 'FIRST_NAME':
        setFirstname(text);
        break;
      case 'LAST_NAME':
        setLastName(text);
        break;
      case 'EMAIL':
        setEmail(text);
        break;
      case 'PASSWORD':
        setPassword(text);
        break;
      default:
        break;
    }
  };

  const handleSignInPress = () => {
    navigation.goBack();
  };

  const handleHelpPress = () => {
    navigation.navigate('Help');
  };

  const handleStartPress = () => {
    dispatch(signupStep1({ firstName, lastName, email, password }));
  };

  useEffect(() => {
    if (error && error.signupStep1Error) {
      setValidationError(error.signupStep1Error);
      setShowValidationError(true);
    } else if (success && success.signupStep1Success) {
      dispatch(resetMessages());
      navigation.navigate('Signup (Step 2)', { fromScreen: 'Signup (Step 1)' });
    }
  }, [success, error]);

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <ContainerView
        onPress={handleRemoveKeyboard}
        backgroundColor="transparent"
        loadingOptions={{ loading: fetching }}
        headerHeight={route.params.headerHeight}
        enableKeyboardAvoidingView={false}
      >
        <SelectionModal
          showModal={showValidationError}
          options={validationErrorOption}
          timeout={500}
          onModalDismissPress={() => setShowValidationError(false)}
        />
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.topView}>
            <LogoView title="SIGN UP" active={false} />
          </View>
          <View style={styles.inputView}>
            <AuthInputView inputOptions={inputBlockOptions} signup />
          </View>
          <View
            style={[
              styles.buttonView,
              isIos &&
                (firstNameActive ||
                  lastNameActive ||
                  emailActive ||
                  passwordActive) && {
                  marginBottom: keyboardHeight + 25,
                },
            ]}
          >
            <AuthButtonView
              onStartPress={handleStartPress}
              mainButtonText="NEXT"
            />
          </View>
        </ScrollView>
        {!firstNameActive &&
          !lastNameActive &&
          !emailActive &&
          !passwordActive && (
            <FooterView backgroundColor="transparent">
              <DualTextButtonView
                leftButtonTitle="Sign In"
                rightButtonTitle="Need Help?"
                leftButtonPress={handleSignInPress}
                rightButtonPress={handleHelpPress}
              />
            </FooterView>
          )}
      </ContainerView>
    </ImageBackground>
  );
};

SignupStep1.defaultProps = {
  error: null,
  success: null,
};

SignupStep1.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.string),
  success: PropTypes.objectOf(PropTypes.string),
};

const mapStateToProps = (state) => {
  const { fetching, error, success } = state.auth;

  return {
    fetching,
    error,
    success,
  };
};

export default connect(mapStateToProps)(SignupStep1);
