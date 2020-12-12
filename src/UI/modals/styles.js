import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

const VIEW_WIDTH = Dimensions.get('window').width;
const VIEW_HEIGHT = Dimensions.get('window').height;

export const photoModalStyles = EStyleSheet.create({
  headerView: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingRight: 25,
    paddingTop: 40,
    paddingLeft: 12,
    zIndex: 999,
  },
  footerViewContainer: {
    backgroundColor: '$white',
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  socialView: {},
  successView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: VIEW_HEIGHT / 2 - 30,
    width: 200,
    height: 60,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  successText: {
    textAlign: 'center',
  },
  returnText: {
    textAlign: 'center',
    color: 'white',
    paddingLeft: 25,
  },
});

export const modalStyles = EStyleSheet.create({
  $buttonsHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  $buttonsVertical: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  $shareInput: {
    height: 100,
    paddingTop: 12,
  },
  $zIndex: 9999,
  $activeColor: 'rgba(0, 0, 0, 0.6)',
  $multilineInput: {
    height: 100,
    paddingTop: 12,
  },

  centeredView: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  modalView: {
    backgroundColor: '$white',
    padding: 25,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerView: {
    flexDirection: 'row',
  },
  contentView: {
    paddingTop: 12,
    marginTop: 25,
  },
  input: {
    height: 60,
    fontSize: 16,
  },
  footerView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  titleText: {
    textTransform: 'uppercase',
    marginBottom: 12,
  },
});
