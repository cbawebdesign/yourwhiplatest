import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, ImageBackground, Keyboard } from 'react-native';

import ContainerView from '../../UI/views/ContainerView';
import LogoView from '../../UI/views/LogoView';
import AuthInputView from '../../UI/views/AuthInputView';
import AuthButtonView from '../../UI/views/AuthButtonView';
import FooterView from '../../UI/views/footer/FooterView';
import TextButton from '../../UI/buttons/TextButton';
import SelectionModal from '../../UI/modals/SelectionModal';

import { validateCode, requestCode, resetMessages } from '../../actions/auth';

import { useKeyboardState } from '../../config/hooks';

import styles from '../styles';

const backgroundImage = require('../../../assets/images/background.png');

const Code = ({ route, navigation, fetching, success, error, email }) => {
  const dispatch = useDispatch();
  const { keyboardHeight } = useKeyboardState();

  const [code, setCode] = useState('');
  const [codeActive, setCodeActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [validationError, setValidationError] = useState('');

  const inputBlockOptions = [
    {
      type: 'CODE',
      placeholder: 'Your Code',
      keyboardType: 'numeric',
      value: code,
      active: codeActive,
      isPassword: true,
      onChangeText: (text) => handleInputChange(text, 'CODE'),
      onPress: (type) => handleInputPress(type),
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
          setShowModal(false);
        },
      },
      {
        title: 'Resend Code',
        onPress: () => {
          dispatch(resetMessages());
          dispatch(requestCode(email));
          setShowModal(false);
        },
      },
    ],
  };

  const handleRemoveKeyboard = () => {
    Keyboard.dismiss();
    setCodeActive(false);
  };

  const handleInputPress = (type) => {
    switch (type) {
      case 'CODE':
        setCodeActive(true);
        break;
      default:
        break;
    }
  };

  const handleInputChange = (text, type) => {
    switch (type) {
      case 'CODE':
        setCode(text);
        break;
      default:
        break;
    }
  };

  const handleStartPress = () => {
    if (code.length === 0) {
      setValidationError('Please enter a valid recovery code');
      setShowModal(true);
    } else {
      dispatch(validateCode(code));
    }

    setCode('');
  };

  useEffect(() => {
    handleRemoveKeyboard();

    if (success && success.validateCodeSuccess) {
      dispatch(resetMessages());
      navigation.navigate('Password');
    } else if (error && error.validateCodeError) {
      setValidationError(error.validateCodeError);
      setShowModal(true);
    }
  }, [success, error]);

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <ContainerView
        onPress={handleRemoveKeyboard}
        backgroundColor="transparent"
        headerHeight={route.params.headerHeight}
        loadingOptions={{ loading: fetching }}
        enableKeyboardAvoidingView={false}
      >
        <SelectionModal
          showModal={showModal}
          options={validationErrorOption}
          timeout={500}
          onModalDismissPress={() => setShowModal(false)}
        />
        <View style={styles.topView}>
          <LogoView title="ENTER CODE" />
        </View>
        <View style={styles.inputView}>
          <AuthInputView inputOptions={inputBlockOptions} />
        </View>
        <View
          style={[
            styles.buttonView,
            codeActive && {
              marginBottom: keyboardHeight + 25,
            },
          ]}
        >
          <AuthButtonView
            onStartPress={handleStartPress}
            mainButtonText="NEXT"
          />
        </View>
        {!codeActive && (
          <FooterView backgroundColor="transparent">
            <TextButton
              text="Send again"
              onPress={() => {
                dispatch(resetMessages());
                dispatch(requestCode(email));
              }}
              uppercase
              textShadow
              opacity={1}
            />
          </FooterView>
        )}
      </ContainerView>
    </ImageBackground>
  );
};

Code.defaultProps = {
  success: null,
  error: null,
};

Code.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.string),
  success: PropTypes.objectOf(PropTypes.string),
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { fetching, success, error, signupEmail } = state.auth;

  return {
    fetching,
    success,
    error,
    email: signupEmail,
  };
};

export default connect(mapStateToProps)(Code);
