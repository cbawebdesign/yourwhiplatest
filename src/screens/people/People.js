import React, { useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PropTypes from 'prop-types';

import Following from './Following';
import Recommended from './Recommended';
import ContainerView from '../../UI/views/ContainerView';
import TabBarTop from '../../UI/tabBars/TabBarTop';

import { getRecommendedUsers } from '../../actions/user';

const Tab = createMaterialTopTabNavigator();

const TabBar = () => (
  <Tab.Navigator
    swipeEnabled={false}
    tabBar={(props) => <TabBarTop {...props} />}
  >
    <Tab.Screen name="Recommended" component={Recommended} />
    <Tab.Screen name="Following" component={Following} />
  </Tab.Navigator>
);

const People = ({ route, fetching }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecommendedUsers());
  }, []);

  return (
    <ContainerView
      touchEnabled={false}
      headerHeight={route.params.headerHeight}
      // loadingOptions={{ loading: fetching }}
    >
      <TabBar />
    </ContainerView>
  );
};

People.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
};

const mapStateToProps = (state) => {
  const { fetching } = state.user;

  return {
    fetching,
  };
};

export default connect(mapStateToProps)(People);
