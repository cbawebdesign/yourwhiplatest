import React from 'react';
import PropTypes from 'prop-types';
import { View, Switch } from 'react-native';

import { CustomText as Text, TITLE_FONT, BODY_FONT } from '../text/CustomText';

import { COLORS } from '../../config/constants';

import { switchButtonStyles as styles } from './styles';

const SwitchButton = ({ onChange, title, subtitle, switchValue }) => (
  <View style={styles.container}>
    <View style={styles.textView}>
      <Text text={title} fontFamily={TITLE_FONT} />
      <Text text={subtitle} fontFamily={BODY_FONT} />
    </View>
    <Switch
      trackColor={{
        true: COLORS.primary1,
      }}
      onValueChange={(value) => onChange(value)}
      value={switchValue}
    />
  </View>
);

SwitchButton.defaultProps = {
  subtitle: null,
};

SwitchButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  switchValue: PropTypes.bool.isRequired,
};

export default SwitchButton;
