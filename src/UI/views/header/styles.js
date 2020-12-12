import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions, Platform } from 'react-native';

const VIEW_WIDTH = Dimensions.get('window').width;

const styles = EStyleSheet.create({
  $innerBackgroundColor: '$white',
  $background: '$backgroundGray',
  $dark: '$black',
  $placeholderColor: '#00000050',

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: VIEW_WIDTH - 44 - 12,
    height: 40,
    marginRight: 12,
    marginTop: Platform.OS === 'ios' ? 0 : 8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '$searchBar',
    borderRadius: 25,
    backgroundColor: '$searchBar',
  },
  searchIcon: {
    width: 25,
    height: 25,
    opacity: 0.3,
    margin: 8,
  },
  input: {
    flex: 1,
    height: 80,
  },
  deleteButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$placeholderColor',
    borderRadius: 10,
    width: 20,
    height: 20,
  },
  deleteIcon: {
    width: 16,
    height: 16,
    tintColor: '$white',
  },
});

export default styles;
