// import React, { useState, useEffect } from 'react';
// import { View } from 'react-native';
// import { useSafeArea } from 'react-native-safe-area-context';
// import { connect, useDispatch } from 'react-redux';

// import { LinearGradient } from 'expo-linear-gradient';
// import StatsDataView from '../../UI/views/StatsDataView';
// import LineChart from '../../UI/charts/LineChart';
// import HighlightScrollView from '../../UI/views/HighlightScrollView';
// import { STATS_CHART_FEED, STATS_INFO_FEED } from '../../helpers/dataHelper';
// import { getWeeksHelper } from '../../helpers/dateTimeHelper';

// import styles from './styles';

// // DISPLAYS THE MONTH TAB SCREEN

// const Week = ({ currentUser, stats }) => {
//   const [monthIndex, setMonthIndex] = useState(0);
//   const [likesActive, setLikesActive] = useState(true);
//   const [followersActive, setFollowersActive] = useState(false);
//   const [chartFeed, setChartFeed] = useState(null);
//   const [infoFeed, setInfoFeed] = useState(null);

//   const handleIndexChange = (index) => {
//     setMonthIndex(index);
//   };

//   const handleViewPress = (type) => {
//     if (type === 'LIKES') {
//       setLikesActive(!likesActive);
//       setFollowersActive(false);
//     } else {
//       setFollowersActive(!followersActive);
//       setLikesActive(false);
//     }

//     setChartFeed(STATS_CHART_FEED());
//   };

//   useEffect(() => {
//     setChartFeed(STATS_CHART_FEED());
//     setInfoFeed(STATS_INFO_FEED());
//   }, [monthIndex]);

//   return (
//     <View style={styles.container}>
//       <HighlightScrollView
//         onIndexChange={handleIndexChange}
//         type="week"
//         startDate={currentUser.dateTime}
//       />
//       <StatsDataView
//         likesActive={likesActive}
//         followersActive={followersActive}
//         onPress={handleViewPress}
//         dataSet={infoFeed}
//       />
//       <LinearGradient
//         style={[
//           styles.gradientView,
//           { height: styles.$gradientViewHeight + useSafeArea().bottom },
//         ]}
//         colors={[styles.$gradientColorFrom, styles.$gradientColorTo]}
//         start={[0, 0]}
//         end={[1, 1]}
//       >
//         <LineChart dataSet={chartFeed} />
//       </LinearGradient>
//     </View>
//   );
// };

// const mapStateToProps = (state) => {
//   const { user } = state.user;
//   const { stats } = state.stats;

//   return {
//     currentUser: user,
//     stats,
//   };
// };

// export default connect(mapStateToProps)(Week);
