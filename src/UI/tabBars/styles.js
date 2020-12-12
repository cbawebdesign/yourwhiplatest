import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const VIEW_WIDTH = Dimensions.get('window').width;

const styles = EStyleSheet.create({
  $active: '$white',
  $inactive: 'transparent',

  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 10,
    marginBottom: 25,
  },
  tabItem: {
    height: 44,
    width: VIEW_WIDTH / 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 4,
    borderColor: 'transparent',
  },
  title: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
});

export default styles;
