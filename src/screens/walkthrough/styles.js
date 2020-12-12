import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  $gradientColorFrom: '$primary1',
  $gradientColorTo: '$primary2',
  $footerColor: '$black',
  $backgroundColor: '$backgroundGray',
  $bottomMargin: 50,

  container: {
    flex: 4,
    alignItems: 'center',
  },
  titleView: {
    flex: 1,
  },
  centerImage: {
    flex: 1.5,
    resizeMode: 'contain',
    width: '100%',
  },
  selectionView: {
    flex: 1.5,
  },
  emptyView: {
    flex: 1,
  },
  numberView: {
    position: 'absolute',
    width: '100%',
    height: 155,
  },
  number: {
    flex: 1,
    fontSize: 150,
    color: '$black',
    opacity: 0.05,
    textAlign: 'center',
  },
});

export default styles;
