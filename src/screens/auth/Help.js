import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ImageBackground, Keyboard } from 'react-native';
import { useDispatch, connect } from 'react-redux';

import ContainerView from '../../UI/views/ContainerView';
import LogoView from '../../UI/views/LogoView';
import AuthInputView from '../../UI/views/AuthInputView';
import AuthButtonView from '../../UI/views/AuthButtonView';
import SelectionModal from '../../UI/modals/SelectionModal';

import { requestCode, resetMessages } from '../../actions/auth';

import styles from '../styles';

const backgroundImage = require('../../../assets/images/splashscreen.png');

const Help = ({ route, navigation, fetching, error, success }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [emailActive, setEmailActive] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [validationError, setValidationError] = useState('');

  const inputBlockOptions = [
    {
      type: 'EMAIL',
      placeholder: 'Email',
      keyboardType: 'email-address',
      value: email,
      onChangeText: (text) => handleInputChange(text, 'EMAIL'),
      onPress: (type) => handleInputPress(type),
      active: emailActive,
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
    ],
  };

  const handleRemoveKeyboard = () => {
    Keyboard.dismiss();
    setEmailActive(false);
  };

  const handleInputPress = (type) => {
    switch (type) {
      case 'EMAIL':
        setEmailActive(true);
        break;
      default:
        break;
    }
  };

  const handleInputChange = (text, type) => {
    switch (type) {
      case 'EMAIL':
        setEmail(text);
        break;
      default:
        break;
    }
  };

  const handleStartPress = () => {
    if (email.length === 0) {
      setShowValidationError(true);
    } else {
      dispatch(requestCode(email));
    }
  };

  useEffect(() => {
    if (success && success.requestCodeSuccess) {
      navigation.navigate('Code');
      dispatch(resetMessages());
    } else if (error && error.requestCodeError) {
      setValidationError(error.requestCodeError);
      setShowValidationError(true);
    }
  }, [error, success]);

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <ContainerView
        onPress={handleRemoveKeyboard}
        backgroundColor="transparent"
        loadingOptions={{ loading: fetching }}
        headerHeight={route.params.headerHeight}
      >
        <SelectionModal
          showModal={showValidationError}
          options={validationErrorOption}
          timeout={500}
          onModalDismissPress={() => setShowValidationError(false)}
        />
        <View style={styles.topView}>
          <LogoView title="SHARE" />
        </View>
        <View style={styles.inputView}>
          <AuthInputView inputOptions={inputBlockOptions} />
        </View>
        <View style={[styles.buttonView, { marginBottom: 50 }]}>
          <AuthButtonView
            onStartPress={handleStartPress}
            mainButtonText="NEXT"
          />
        </View>
      </ContainerView>
    </ImageBackground>
  );
};

Help.defaultProps = {
  success: null,
  error: null,
};

Help.propTypes = {
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
  const { success, error, fetching } = state.auth;

  return {
    fetching,
    success,
    error,
  };
};

export default connect(mapStateToProps)(Help);
