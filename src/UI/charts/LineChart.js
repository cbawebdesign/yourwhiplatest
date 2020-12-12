import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory-native';

const xAxisStyles = {
  axis: { stroke: 'transparent' },
  grid: { stroke: '#000', opacity: 0.1 },
  ticks: {
    stroke: 'transparent',
  },
  tickLabels: {
    fontSize: 11,
    fill: 'black',
    padding: 5,
    verticalAnchor: 'start',
  },
};

const LineChart = ({ dataSet }) => {
  if (dataSet === null) {
    return null;
  }

  return (
    <View>
      <VictoryChart height={275} padding={{ bottom: 25, top: 80 }}>
        <VictoryAxis
          style={xAxisStyles}
          tickFormat={(datum, index) => (index === 5 ? '' : datum)}
        />
        <VictoryLine
          style={{
            data: { stroke: '#fff', strokeWidth: 4 },
          }}
          data={dataSet}
          interpolation="basis"
          contentInset={{ top: 20, bottom: 20 }}
        />
      </VictoryChart>
    </View>
  );
};

LineChart.defaultProps = {
  dataSet: [],
};

LineChart.propTypes = {
  dataSet: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })
  ),
};

export default LineChart;
