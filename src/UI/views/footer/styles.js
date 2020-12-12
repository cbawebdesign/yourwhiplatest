import EStyleSheet from 'react-native-extended-stylesheet';

export const footerViewStyles = EStyleSheet.create({
  $gradientColorFrom: '$primary1',
  $gradientColorTo: '$primary2',
  $dark: '$black',

  largeButtonView: {
    position: 'absolute',
    width: '100',
    height: 60,
  },
});

export const dualTextButtonViewStyles = EStyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 50,
    paddingRight: 50,
  },
});

export const composeControlsViewStyles = EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
  },
  leftButtonView: {
    flex: 2,
    flexDirection: 'row',
    paddingLeft: 5,
  },
  rightButtonView: {
    flex: 3,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
});

export const footerMenuViewStyles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '$white',
  },
  buttonView: {
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -1,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '$backgroundGray',
  },
  buttonTitle: {
    textTransform: 'uppercase',
  },
});

export default {
  footerViewStyles,
  dualTextButtonViewStyles,
  composeControlsViewStyles,
  footerMenuViewStyles,
};
