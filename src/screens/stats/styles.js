import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const VIEW_WIDTH = Dimensions.get('window').width;

const styles = EStyleSheet.create({
  $gradientColorFrom: '$primary1',
  $gradientColorTo: '$primary2',
  $gradientViewHeight: 325,
  $scrollviewItemViewWidth: VIEW_WIDTH / 3 + 10 + 20,

  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '$backgroundGray',
  },
  gradientView: {
    height: 275,
  },
});

export default styles;
