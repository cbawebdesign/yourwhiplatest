import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { CustomText as Text, BODY_FONT } from '../text/CustomText';

import { selectionScrollViewStyles as styles } from './styles';

// DISPLAYS SELECTABLE SQUARES INSIDE A HORIZONTAL SCROLLVIEW
// Takes the following props:
// items (the selectable items to display)
// onItemPress (to select an item)import React from 'react';

const SelectionScrollView = ({ items, onItemPress }) => (
  <View style={styles.container}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {items.map((item, index) => (
        <TouchableOpacity
          activeOpacity={1}
          key={index.toString()}
          onPress={() => onItemPress(item)}
          activeOpacity={0.9}
        >
          <View
            style={[
              styles.cardView,
              {
                backgroundColor: item.selected
                  ? styles.$selected
                  : styles.$deselected,
                shadowOpacity: item.selected ? 0 : 0.25,
              },
            ]}
          >
            <Text
              text={item.title}
              fontFamily={BODY_FONT}
              style={{
                color: item.selected ? styles.$deselected : styles.$selected,
              }}
            />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

SelectionScrollView.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onItemPress: PropTypes.func.isRequired,
};

export default SelectionScrollView;
