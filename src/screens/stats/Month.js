import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, RefreshControl } from 'react-native';
import { useDispatch, connect } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';

import { LinearGradient } from 'expo-linear-gradient';
import StatsDataView from '../../UI/views/StatsDataView';
import LineChart from '../../UI/charts/LineChart';
import HighlightScrollView from '../../UI/views/HighlightScrollView';

import { getStatsForMonth } from '../../actions/stats';

import { userPropType, statsPropType } from '../../config/propTypes';

import styles from './styles';

// DISPLAYS THE MONTH TAB SCREEN

const Month = ({ currentUser, stats, fetching }) => {
  const dispatch = useDispatch();

  const [monthIndex, setMonthIndex] = useState(0);
  const [likesActive, setLikesActive] = useState(true);
  const [followersActive, setFollowersActive] = useState(false);

  const handleIndexChange = (index) => {
    setMonthIndex(index);
  };

  const handleViewPress = (type) => {
    if (type === 'LIKES') {
      setLikesActive(!likesActive);
      setFollowersActive(false);
    } else {
      setFollowersActive(!followersActive);
      setLikesActive(false);
    }
  };

  const getDataForSelectedMonth = () => {
    const startingDate = new Date(currentUser.dateTime);
    const selectedDate = new Date(
      startingDate.setMonth(startingDate.getMonth() + monthIndex)
    );

    dispatch(getStatsForMonth(selectedDate));
  };

  const getChartData = () => {
    if (likesActive) {
      return stats.dailyLikesList.map((item) => ({
        x: item.date,
        y: item.likesCount,
      }));
    }

    return stats.dailyFollowersList.map((item) => ({
      x: item.date,
      y: item.followersCount,
    }));
  };
  const handleRefresh = () => {
    getDataForSelectedMonth();
  };

  useEffect(() => {
    getDataForSelectedMonth();
  }, [monthIndex]);

  if (!currentUser) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={fetching} onRefresh={handleRefresh} />
        }
        refreshing={fetching}
      >
        <HighlightScrollView
          onIndexChange={handleIndexChange}
          type="month"
          startDate={currentUser.dateTime}
        />
        <StatsDataView
          likesActive={likesActive}
          followersActive={followersActive}
          onPress={handleViewPress}
          dataSet={{
            likesAbsolute: stats.likesCount,
            followersAbsolute: stats.followersCount,
            likesGrowth: stats.likesGrowth,
            followersGrowth: stats.followersGrowth,
          }}
        />
        <LinearGradient
          style={[
            styles.gradientView,
            { height: styles.$gradientViewHeight + useSafeArea().bottom },
          ]}
          colors={[styles.$gradientColorFrom, styles.$gradientColorTo]}
          start={[0, 0]}
          end={[1, 1]}
        >
          <LineChart dataSet={getChartData()} />
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

Month.defaultProps = {
  currentUser: null,
};

Month.propTypes = {
  currentUser: userPropType,
  stats: statsPropType.isRequired,
  fetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { user } = state.user;
  const { stats, fetching } = state.stats;

  return {
    currentUser: user,
    stats,
    fetching,
  };
};

export default connect(mapStateToProps)(Month);
