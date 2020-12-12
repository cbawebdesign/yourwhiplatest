import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import TextButton from '../../buttons/TextButton';

import { dualTextButtonViewStyles as styles } from './styles';

// DISPLAYS THE DOUBLE FOOTER BUTTONS VIEW
// Takes the following props:
// leftButtonTitle (renders the title of button 1)
// leftButtonOnPress (to navigate to following screen)
// rightButtonTitle (renders the title of button 2)
// rightButtonPress (to navigate to following screen)

const DualTextButtonView = ({
  leftButtonTitle,
  leftButtonPress,
  rightButtonTitle,
  rightButtonPress,
}) => {
  return (
    <View style={styles.container}>
      <TextButton
        text={leftButtonTitle}
        onPress={leftButtonPress}
        uppercase
        textShadow
        opacity={1}
      />
      <TextButton
        text={rightButtonTitle}
        onPress={rightButtonPress}
        uppercase
        textShadow
        opacity={1}
      />
    </View>
  );
};

DualTextButtonView.propTypes = {
  leftButtonTitle: PropTypes.string.isRequired,
  rightButtonTitle: PropTypes.string.isRequired,
  leftButtonPress: PropTypes.func.isRequired,
  rightButtonPress: PropTypes.func.isRequired,
};

export default DualTextButtonView;
