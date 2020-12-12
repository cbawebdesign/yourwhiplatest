import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const VIEW_WIDTH = Dimensions.get('window').width;

export const animatedTextInputStyles = EStyleSheet.create({
  $containerSmall: 1,
  $containerLarge: 1.15,
  $activeShadow: {
    shadowColor: '$black',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 7,
    zIndex: 999,
  },
  $inactiveShadow: {
    shadowColor: 'transparent',
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingLeft: 12,
    width: VIEW_WIDTH - 100,
    height: 70,
    backgroundColor: '$white',
  },
  icon: {
    width: 18,
    height: 18,
    tintColor: '$black',
    marginRight: 8,
  },
  placeholder: {
    fontSize: 10,
    color: '$black',
    opacity: 0.4,
  },
  input: {
    position: 'absolute',
    width: VIEW_WIDTH - 210,
    marginLeft: 100,
    fontSize: 12,
    color: '$black',
  },
});

export default { animatedTextInputStyles };
