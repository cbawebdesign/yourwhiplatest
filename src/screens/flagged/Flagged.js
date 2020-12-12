import React from 'react';
import PropTypes from 'prop-types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import FlaggedPosts from './Posts';
import FlaggedComments from './Comments';
import TabBarTop from '../../UI/tabBars/TabBarTop';
import ContainerView from '../../UI/views/ContainerView';

const Tab = createMaterialTopTabNavigator();

const TabBar = () => (
  <Tab.Navigator
    swipeEnabled={false}
    tabBar={(props) => <TabBarTop {...props} />}
  >
    <Tab.Screen name="Posts" component={FlaggedPosts} />
    <Tab.Screen name="Comments" component={FlaggedComments} />
  </Tab.Navigator>
);

const Flagged = ({ route }) => (
  <ContainerView touchEnabled={false} headerHeight={route.params.headerHeight}>
    <TabBar />
  </ContainerView>
);

Flagged.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
};

export default Flagged;
