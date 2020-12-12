import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { VictoryPie } from 'victory-native';

const PieChart = ({ dataSet }) => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <VictoryPie
        data={dataSet}
        style={{
          labels: {
            fill: 'transparent',
          },
        }}
        colorScale={['#CDFDD8', '#000']}
        radius={() => 30}
        height={80}
      />
    </View>
  );
};

PieChart.defaultProps = {
  dataSet: [],
};

PieChart.propTypes = {
  dataSet: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.string.isRequired,
      y: PropTypes.number.isRequired,
    })
  ),
};

export default PieChart;
