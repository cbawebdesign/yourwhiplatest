import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ImageBackground, Keyboard } from 'react-native';
import { useDispatch, connect } from 'react-redux';

import ContainerView from '../../UI/views/ContainerView';
import LogoView from '../../UI/views/LogoView';
import AuthInputView from '../../UI/views/AuthInputView';
import AuthButtonView from '../../UI/views/AuthButtonView';
import SelectionModal from '../../UI/modals/SelectionModal';

import { resetPassword, resetMessages, storeToken } from '../../actions/auth';

import { useKeyboardState } from '../../config/hooks';

import styles from '../styles';

const backgroundImage = '';

const Password = ({ route, navigation, success, error, authToken }) => {
  const dispatch = useDispatch();
  const { keyboardHeight } = useKeyboardState();

  const [password, setPassword] = useState('');
  const [passwordActive, setPasswordActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setShowModalMessage] = useState({ title: '', body: '' });

  const inputBlockOptions = [
    {
      type: 'PASSWORD',
      placeholder: 'Password',
      isPassword: true,
      value: password,
      onChangeText: (text) => handleInputChange(text, 'PASSWORD'),
      onPress: (type) => handleInputPress(type),
      active: passwordActive,
    },
  ];

  const modalOptions = {
    title: modalMessage.title,
    body: modalMessage.body,
    buttonStyle: 'horizontal',
    buttons:
      success && success.passwordUpdateSuccess
        ? [
            {
              title: 'To the app',
              onPress: () => {
                setShowModal(false);
                dispatch(resetMessages());

                if (authToken) {
                  navigation.goBack();
                } else {
                  dispatch(storeToken(success.authToken));
                }
              },
            },
          ]
        : [
            {
              title: 'Try Again',
              onPress: () => setShowModal(false),
            },
          ],
  };

  const handleRemoveKeyboard = () => {
    Keyboard.dismiss();
    setPasswordActive(false);
  };

  const handleInputPress = (type) => {
    switch (type) {
      case 'PASSWORD':
        setPasswordActive(true);
        break;
      default:
        break;
    }
  };

  const handleInputChange = (text, type) => {
    switch (type) {
      case 'PASSWORD':
        setPassword(text);
        break;
      default:
        break;
    }
  };

  const handleStartPress = () => {
    handleRemoveKeyboard();

    if (password.length < 8) {
      setShowModal(true);
      setShowModalMessage({
        title: 'Invalid Password',
        body: 'Your password must have a minimum of 8 characters.',
      });
    } else {
      dispatch(resetPassword(password));
    }

    setPassword('');
  };

  useEffect(() => {
    handleRemoveKeyboard();

    if (success && success.passwordUpdateSuccess) {
      setShowModalMessage({
        title: 'Password updated',
        body: success.passwordUpdateSuccess,
      });
      setShowModal(true);
    } else if (error) {
      setShowModalMessage({ title: 'Authentication error', body: error });
    }
  }, [error, success]);

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <ContainerView
        onPress={handleRemoveKeyboard}
        backgroundColor="lightblue"
        headerHeight={route.params.headerHeight}
        enableKeyboardAvoidingView={false}
      >
        <SelectionModal
          showModal={showModal}
          options={modalOptions}
          timeout={500}
          onModalDismissPress={() => setShowModal(false)}
        />
        <View style={styles.topView}>
          <LogoView title="CREATE PASSWORD" />
        </View>
        <View style={styles.inputView}>
          <AuthInputView inputOptions={inputBlockOptions} />
        </View>
        <View
          style={[
            styles.buttonView,
            { marginBottom: 50 },
            passwordActive && {
              marginBottom: keyboardHeight + 25,
            },
          ]}
        >
          <AuthButtonView
            onStartPress={handleStartPress}
            mainButtonText="NEXT"
          />
        </View>
      </ContainerView>
    </ImageBackground>
  );
};

Password.defaultProps = {
  error: null,
  success: null,
  authToken: null,
};

Password.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  error: PropTypes.objectOf(PropTypes.string),
  success: PropTypes.objectOf(PropTypes.string),
  authToken: PropTypes.string,
};

const mapStateToProps = (state) => {
  const { success, error, signupEmail, authToken } = state.auth;

  return {
    success,
    error,
    email: signupEmail,
    authToken,
  };
};

export default connect(mapStateToProps)(Password);
