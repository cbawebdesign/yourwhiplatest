import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import BlockButton from '../buttons/BlockButton';

import { authButtonViewStyles as styles } from './styles';

// DISPLAYS THE BUTTON SECTION IN ALL AUTHENTICATION-RELATED SCREENS.
// Takes the following props:
// active (controls display / hide of social buttons when inputs are active)
// onStartPress (handles start button press)
// onFBPress (handles Facebook button press)
// onGooglePress (handles Google button press)
// enableSocial (controls displaying / hiding of social buttons at all times)
// mainButtonText (sets the title for the main button)

const AuthButtonView = ({
  active,
  onStartPress,
  onFBPress,
  onGooglePress,
  enableSocial,
  mainButtonText,
}) => (
  <View style={styles.container}>
    <BlockButton text={mainButtonText} onPress={onStartPress} />
    {enableSocial && !active && (
      <View style={styles.horizontalButtons}>
        <BlockButton
          text="Facebook"
          onPress={onFBPress}
          colorOptions={{ colorFrom: '#759BD9', colorTo: '#6E92CC' }}
          textColor={styles.$socialText}
          small
        />
        <BlockButton
          text="Google"
          onPress={onGooglePress}
          colorOptions={{ colorFrom: '#D98175', colorTo: '#CC796E' }}
          textColor="#ffffff"
          small
        />
      </View>
    )}
  </View>
);

AuthButtonView.defaultProps = {
  active: false,
  enableSocial: false,
  onFBPress: null,
  onGooglePress: null,
};

AuthButtonView.propTypes = {
  active: PropTypes.bool,
  onStartPress: PropTypes.func.isRequired,
  onFBPress: PropTypes.func,
  onGooglePress: PropTypes.func,
  enableSocial: PropTypes.bool,
  mainButtonText: PropTypes.string.isRequired,
};

export default AuthButtonView;
