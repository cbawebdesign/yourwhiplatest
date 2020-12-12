import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  title: {
    fontSize: 16,
    marginBottom: 25,
    textTransform: 'uppercase',
    opacity: 0.5,
  },
  body: {
    textAlign: 'center',
    opacity: 0.5,
  },
});

export default styles;
