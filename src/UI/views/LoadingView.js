import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';

import { loadingViewStyles as styles } from './styles';

const LoadingView = ({ hideSpinner }) => (
  <View style={styles.container}>
    {!hideSpinner && <ActivityIndicator size="large" color="white" />}
  </View>
);

LoadingView.defaultProps = {
  hideSpinner: false,
};

LoadingView.propTypes = {
  hideSpinner: PropTypes.bool,
};

export default LoadingView;
