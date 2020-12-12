import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import ListItemContainerView from '../views/listItemViews/ListItemContainerView';
import { CustomText as Text, TITLE_FONT, BODY_FONT } from '../text/CustomText';
import ProfileImageView from '../views/ProfileImageView';

import { userPropType } from '../../config/propTypes';
import { OUTER_CONTAINER_MARGIN_LEFT_RIGHT } from '../../config/constants';

import { peopleListItemStyles as styles } from './styles';

const followIcon = require('../../../assets/icons/follow.png');

const ANIMATION_DURATION = 300;

const PeopleListItem = ({
  item,
  following,
  onFollowPress,
  onDeletePress,
  onProfilePress,
  disableSwipe,
}) => {
  const opacity = new Animated.Value(1);

  const handleDeletePress = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(() => onDeletePress());
  };

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 1],
      outputRange: [
        85 - OUTER_CONTAINER_MARGIN_LEFT_RIGHT / 2,
        86 - OUTER_CONTAINER_MARGIN_LEFT_RIGHT / 2,
      ],
    });

    return (
      <Animated.View style={{ opacity }}>
        <TouchableOpacity onPress={handleDeletePress} activeOpacity={0.9}>
          <Animated.View
            style={[
              styles.deleteView,
              {
                transform: [{ translateX: trans }],
              },
            ]}
          >
            <Text
              text="Remove"
              fontFamily={TITLE_FONT}
              style={styles.deleteText}
            />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  if (disableSwipe) {
    return (
      <ListItemContainerView height={styles.$containerheight} row>
        <View style={styles.container}>
          <View style={styles.profileInfoView}>
            <ProfileImageView
              profileImage={item.profileImage}
              name={`${item.firstName} ${item.lastName}`}
              onPress={onProfilePress}
            />
          </View>
          <View style={styles.infoView}>
            <View style={styles.nameView}>
              <Text
                text={`${item.firstName} ${item.lastName}`}
                fontFamily={BODY_FONT}
                style={styles.name}
              />
              <Text
                text={`@ ${item.firstName}_${item.lastName}`}
                fontFamily={BODY_FONT}
                style={styles.email}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={onFollowPress} activeOpacity={0.9}>
          <LinearGradient
            style={[styles.gradientView, { opacity: item.following ? 1 : 0.2 }]}
            colors={[styles.$gradientColorFrom, styles.$gradientColorTo]}
            start={[0, 0]}
            end={[1, 1]}
          >
            <Image source={followIcon} style={styles.followIcon} />
          </LinearGradient>
        </TouchableOpacity>
      </ListItemContainerView>
    );
  }

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Animated.View style={[styles.container, { opacity }]}>
        <ListItemContainerView height={styles.$containerheight} row>
          <View style={styles.container}>
            <View style={styles.profileInfoView}>
              <ProfileImageView
                profileImage={item.profileImage}
                name={`${item.firstName} ${item.lastName}`}
                onPress={onProfilePress}
              />
            </View>
            <View style={styles.infoView}>
              <View style={styles.nameView}>
                <Text
                  text={`${item.firstName} ${item.lastName}`}
                  fontFamily={BODY_FONT}
                  style={styles.name}
                />
                <Text
                  text={item.description}
                  fontFamily={BODY_FONT}
                  style={styles.description}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={onFollowPress} activeOpacity={0.9}>
            <LinearGradient
              style={[styles.gradientView, { opacity: following ? 1 : 0.2 }]}
              colors={[styles.$gradientColorFrom, styles.$gradientColorTo]}
              start={[0, 0]}
              end={[1, 1]}
            >
              <Image source={followIcon} style={styles.followIcon} />
            </LinearGradient>
          </TouchableOpacity>
        </ListItemContainerView>
      </Animated.View>
    </Swipeable>
  );
};

PeopleListItem.defaultProps = {
  disableSwipe: false,
  onDeletePress: null,
  following: null,
};

PeopleListItem.propTypes = {
  item: userPropType.isRequired,
  following: PropTypes.bool,
  onFollowPress: PropTypes.func.isRequired,
  onDeletePress: PropTypes.func,
  onProfilePress: PropTypes.func.isRequired,
  disableSwipe: PropTypes.bool,
};

export default PeopleListItem;
