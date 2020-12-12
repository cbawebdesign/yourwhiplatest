import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect, useDispatch } from 'react-redux';
import { useSafeArea } from 'react-native-safe-area-context';
import { debounce } from 'throttle-debounce';
import { AnimatedSectionList, AnimationType } from 'flatlist-intro-animations';

import ContainerView from '../UI/views/ContainerView';
import TimelineListItem from '../UI/lists/TimelineListItem';
import {
  CustomText as Text,
  TITLE_FONT,
  BODY_FONT,
} from '../UI/text/CustomText';
import EmptyListText from '../UI/text/EmptyListText';

import { getTimelineFeed } from '../actions/timeline';

import { userPropType } from '../config/propTypes';
import { PAGINATION_LIMIT } from '../config/constants';

import { isCloseToBottom } from '../helpers/scrollHelpers';

import styles from './styles';

const Timeline = ({
  route,
  navigation,
  timelineFeed,
  endOfList,
  currentUser,
  fetching,
}) => {
  const dispatch = useDispatch();

  const [getFeed, setGetFeed] = useState(false);

  const handleProfilePress = (item) => {
    navigation.navigate('Profile', {
      user: item.user_action,
    });
  };

  const handleLoadMore = (count) => {
    dispatch(getTimelineFeed(count, PAGINATION_LIMIT));
  };
  const handleLoadMoreThrottled = useRef(debounce(500, handleLoadMore)).current;

  const handleRefresh = () => {
    dispatch(getTimelineFeed(0, PAGINATION_LIMIT));
  };

  const renderEmptyListText = () => (
    <EmptyListText text="Once people start interacting with your posts, an overview of their actions will appear on this screen" />
  );

  const renderListFooterComponent = () => (
    <Text
      text={timelineFeed.length > 0 && endOfList ? "That's all folks!" : ''}
      fontFamily={BODY_FONT}
      style={styles.endOfList}
    />
  );

  useEffect(() => {
    if (!getFeed) {
      dispatch(getTimelineFeed(0, PAGINATION_LIMIT));
      setGetFeed(true);
    }
  }, [timelineFeed]);

  if (!currentUser) {
    return <View />;
  }

  return (
    <ContainerView
      touchEnabled={false}
      headerHeight={route.params.headerHeight}
    >
      <AnimatedSectionList
        focused={!fetching}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: useSafeArea().bottom },
        ]}
        animationType={
          currentUser.settings.enableIntroAnimations
            ? AnimationType.SlideFromRight
            : AnimationType.None
        }
        sections={timelineFeed || []}
        renderItem={({ item }) => (
          <TimelineListItem
            item={item}
            onProfilePress={() => handleProfilePress(item)}
            currentUser={currentUser}
          />
        )}
        renderSectionHeader={({ section: { title } }) =>
          fetching ? null : (
            <View style={styles.sectionTitleView}>
              <Text
                text={title}
                fontFamily={TITLE_FONT}
                style={styles.sectionTitle}
              />
            </View>
          )
        }
        onScroll={({ nativeEvent }) => {
          if (fetching || endOfList) return;

          if (isCloseToBottom(nativeEvent)) {
            handleLoadMoreThrottled(
              timelineFeed.reduce((a, b) => a + Number(b.data.length), 0)
            );
          }
        }}
        onRefresh={handleRefresh}
        refreshing={fetching}
        ListEmptyComponent={renderEmptyListText()}
        ListFooterComponent={renderListFooterComponent()}
        keyExtractor={(item) => item._id}
      />
    </ContainerView>
  );
};

Timeline.defaultProps = {
  currentUser: null,
};

Timeline.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  timelineFeed: PropTypes.arrayOf(PropTypes.any).isRequired,
  endOfList: PropTypes.bool.isRequired,
  currentUser: userPropType,
  fetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { timelineFeed, endOfList, fetching } = state.timeline;
  const { user } = state.user;

  return {
    timelineFeed,
    endOfList,
    currentUser: user,
    fetching,
  };
};
export default connect(mapStateToProps)(Timeline);
