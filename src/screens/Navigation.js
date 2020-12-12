import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { AnimatedFlatList, AnimationType } from 'flatlist-intro-animations';

import ContainerView from '../UI/views/ContainerView';
import FooterView from '../UI/views/footer/FooterView';
import IconLabelButton from '../UI/buttons/IconLabelButton';
import TextButton from '../UI/buttons/TextButton';

import { NAVIGATION_ITEMS } from '../helpers/dataHelper';

import { logout, resetMessages } from '../actions/auth';

import { FLAGGED, DISCOVER, NAVIGATION } from '../config/constants';
import { userPropType } from '../config/propTypes';

import styles from './styles';

const Navigation = ({
  route,
  navigation,
  currentUser,
  walkthroughComplete,
  fetching,
}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(resetMessages());
    dispatch(logout());
  };

  const handleSelection = (item) => {
    if (item.title === DISCOVER) {
      dispatch({ type: 'REMOVE_WALKTHROUGH_COMPLETE' });
    } else {
      // MAKE SURE TO PASS USER
      // PROFILE DATA IS COLLECTED FROM USER._ID
      navigation.navigate(item.navigateTo, {
        ...route.params,
        user: currentUser,
      });
    }
  };

  useEffect(() => {
    // NAVIGATION TO 'WALKTHROUGH' NAVIGATIONSTACK ONLY POSSIBLE AFTER DISPATCH COMPLETES
    // IT IS NOT POSSIBLE TO AWAIT DISPATCH, THEREFORE THIS HACK
    if (!walkthroughComplete) {
      navigation.navigate(DISCOVER, {
        ...route.params,
        fromScreen: NAVIGATION,
        user: currentUser,
      });
    }
  }, [walkthroughComplete]);

  if (!currentUser) {
    return (
      <ContainerView
        hasGradient
        headerHeight={route.params.headerHeight}
        loadingOptions={{ loading: fetching }}
      />
    );
  }

  const getData = () =>
    NAVIGATION_ITEMS.filter((item) => {
      if (item.title === FLAGGED && currentUser.isAdmin) {
        return true;
      } else if (item.title === FLAGGED) {
        return false;
      }
      return true;
    });

  return (
    <ContainerView
      hasGradient
      headerHeight={route.params.headerHeight}
      loadingOptions={{ loading: fetching }}
      touchEnabled={false}
    >
      <AnimatedFlatList
        contentContainerStyle={styles.$navigationInnerContainer}
        data={getData()}
        animationType={
          currentUser.settings.enableIntroAnimations
            ? AnimationType.Dive
            : AnimationType.None
        }
        focused
        numColumns={2}
        renderItem={({ item, index }) => (
          <IconLabelButton
            key={index.toString()}
            icon={item.icon}
            label={item.title}
            onPress={() => handleSelection(item)}
            isVertical
            height={100}
          />
        )}
        keyExtractor={(item) => item.title}
      />
      <FooterView backgroundColor="white">
        <TextButton
          text="Logout"
          onPress={handleLogout}
          color="black"
          uppercase
          opacity={1}
        />
      </FooterView>
    </ContainerView>
  );
};

Navigation.defaultProps = {
  currentUser: null,
};

Navigation.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  walkthroughComplete: PropTypes.bool.isRequired,
  currentUser: userPropType,
  fetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { walkthroughComplete, user } = state.user;
  const { fetching } = state.auth;

  return {
    walkthroughComplete,
    currentUser: user,
    fetching,
  };
};

export default connect(mapStateToProps)(Navigation);
