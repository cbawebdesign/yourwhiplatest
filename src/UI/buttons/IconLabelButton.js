import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity } from 'react-native';

import { CustomText as Text, TITLE_FONT, BODY_FONT } from '../text/CustomText';

import { iconLabelButtonStyles as styles } from './styles';

const IconLabelButton = ({
  onPress,
  icon,
  label,
  subtitle,
  tintColor,
  isVertical,
  isCentered,
  disabled,
  height,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.6}>
      {isCentered ? (
        <View style={styles.containerCentered}>
          <Image source={icon} style={[styles.image, { tintColor }]} />
          <Text
            text={label}
            fontFamily={TITLE_FONT}
            style={[styles.label, styles.$centeredStyle]}
          />
        </View>
      ) : (
        <View
          style={[
            isVertical
              ? styles.$verticalContainer
              : styles.$horizontalContainer,
            { height },
          ]}
        >
          <View>
            <Text text={label} fontFamily={TITLE_FONT} style={styles.label} />
            {subtitle && subtitle.length > 0 && (
              <Text
                text={subtitle}
                fontFamily={BODY_FONT}
                style={styles.subtitle}
              />
            )}
          </View>
          <Image source={icon} style={[styles.image, { tintColor }]} />
        </View>
      )}
    </TouchableOpacity>
  );
};

IconLabelButton.defaultProps = {
  tintColor: '#020202',
  isVertical: false,
  isCentered: false,
  subtitle: null,
  icon: null,
  disabled: false,
  height: 60,
};

IconLabelButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  tintColor: PropTypes.string,
  isVertical: PropTypes.bool,
  isCentered: PropTypes.bool,
  disabled: PropTypes.bool,
  height: PropTypes.number,
};

export default IconLabelButton;
