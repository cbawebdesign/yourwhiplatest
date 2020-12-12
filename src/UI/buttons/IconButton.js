import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity } from 'react-native';

import { iconButtonStyles as styles } from './styles';

const IconButton = ({ onPress, icon, tintColor, size }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
    <View style={styles.container}>
      {typeof icon === 'object' ? (
        <Image
          source={icon}
          style={[styles.image, { width: size, height: size }]}
        />
      ) : (
        <Image
          source={icon}
          style={[styles.image, { tintColor, width: size, height: size }]}
        />
      )}
    </View>
  </TouchableOpacity>
);

IconButton.defaultProps = {
  tintColor: '#020202',
  size: 25,
};

IconButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.object]).isRequired,
  tintColor: PropTypes.string,
  size: PropTypes.number,
};

export default IconButton;
