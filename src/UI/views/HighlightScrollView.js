import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView } from 'react-native';

import { CustomText as Text, TITLE_FONT } from '../text/CustomText';
import { getPeriodsHelper } from '../../helpers/dateTimeHelper';

import { highlightScrollViewStyles as styles } from './styles';

const HighlightScrollView = ({ onIndexChange, type, startDate }) => {
  const scrollviewRef = useRef(null);

  const [centerIndex, setCenterIndex] = useState(0);

  const getScrollValues = () => {
    const periodsList = [];

    const currentYear = new Date(Date.now()).getFullYear();
    const startingYear = new Date(startDate).getFullYear();

    for (let i = startingYear; i <= currentYear; i++) {
      periodsList.push({
        year: i,
        periods: getPeriodsHelper(type, startDate, i),
      });
    }

    return periodsList.map((item, i) =>
      item.periods.map((month, j) => (
        <View
          key={`${item.year}-${month}`}
          style={[
            styles.scrollviewItemView,
            { opacity: centerIndex === i * item.periods.length + j ? 1 : 0.1 },
          ]}
        >
          <Text
            text={month.substring(0, 3)}
            fontFamily={TITLE_FONT}
            style={styles.scrollviewPeriod}
          />
          {j === 0 && type !== 'day' && (
            <Text
              text={item.year}
              fontFamily={TITLE_FONT}
              style={[
                styles.scrollViewYear,
                type === 'month' || type === 'day'
                  ? styles.$typeMonth
                  : styles.$typeWeek,
              ]}
            />
          )}
        </View>
      ))
    );
  };

  useEffect(() => {
    scrollviewRef.current.scrollToEnd({ animated: true });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        decelerationRate="fast"
        snapToInterval={styles.$scrollviewItemViewWidth}
        snapToAlignment="left"
        scrollEventThrottle={16}
        onScroll={({ nativeEvent }) => {
          const index = Math.round(
            nativeEvent.contentOffset.x / styles.$scrollviewItemViewWidth
          );
          if (index !== centerIndex) {
            setCenterIndex(index);
          }
        }}
        onMomentumScrollEnd={({ nativeEvent }) => {
          const index = Math.round(
            nativeEvent.contentOffset.x / styles.$scrollviewItemViewWidth
          );
          onIndexChange(index);
        }}
        ref={scrollviewRef}
      >
        {getScrollValues()}
      </ScrollView>
    </View>
  );
};

HighlightScrollView.defaultProps = {};

HighlightScrollView.propTypes = {
  onIndexChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default HighlightScrollView;
