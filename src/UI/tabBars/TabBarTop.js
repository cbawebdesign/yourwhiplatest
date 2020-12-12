import React from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

import { CustomText as Text, TITLE_FONT } from '../text/CustomText';

import styles from './styles';

const VIEW_WIDTH = Dimensions.get('window').width;

function TabBarTop({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name;
        const isFocused = state.index === index;

        const tabItemStyles = [
          styles.tabItem,
          {
            width: (VIEW_WIDTH - 50) / state.routes.length,
            borderColor: isFocused ? styles.$active : styles.$inactive,
          },
        ];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={label}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            activeOpacity={0.9}
          >
            <View style={tabItemStyles}>
              <Text text={label} fontFamily={TITLE_FONT} style={styles.title} />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

TabBarTop.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  state: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  descriptors: PropTypes.object.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default TabBarTop;
