import React from 'react';
import PropTypes from 'prop-types';

import Month from './Month';
import ContainerView from '../../UI/views/ContainerView';

const Stats = ({ route }) => (
  <ContainerView touchEnabled={false} headerHeight={route.params.headerHeight}>
    <Month />
  </ContainerView>
);

Stats.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
};

export default Stats;
