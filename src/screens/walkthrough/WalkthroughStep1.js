import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import ContainerView from '../../UI/views/ContainerView';
import FooterView from '../../UI/views/footer/FooterView';
import TitleBodyTextView from '../../UI/views/TitleBodyTextView';
import DualTextButtonView from '../../UI/views/footer/DualTextButtonView';
import { CustomText as Text, TITLE_FONT } from '../../UI/text/CustomText';

import { setWalkthroughComplete } from '../../actions/user';

import styles from './styles';

// DISPLAYS THE FIRST WALKTHROUGH SCREEN
// Applies the following props:
// navigation (to navigate to the second Walkthrough screen)
// Skip navigation is handled by dispatching the 'SET_WALKTHROUGH_COMPLETE'
// action. This prevents having to visit the Walkthrough section
// each time following login.

const centerImage = '';

const WalkthroughStep1 = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const handleSkip = () => {
    dispatch(setWalkthroughComplete());
  };

  const handleNext = () => {
    navigation.navigate('Discover');
  };

  return (
    <ContainerView hasGradient headerHeight={route.params.headerHeight}>
      <View style={styles.titleView}>
        <TitleBodyTextView
          title="Get Started"
          body="Assemble a group of followers and share your photos, videos and more"
        />
      </View>
      <Image source={centerImage} style={styles.centerImage} />
      <View style={styles.emptyView} />
      <View
        style={[
          styles.numberView,
          { bottom: styles.$bottomMargin + useSafeArea().bottom },
        ]}
      >
        <Text text="01" fontFamily={TITLE_FONT} style={styles.number} />
      </View>
      <FooterView>
        <DualTextButtonView
          leftButtonTitle="SKIP"
          leftButtonPress={handleSkip}
          rightButtonTitle="NEXT"
          rightButtonPress={handleNext}
        />
      </FooterView>
    </ContainerView>
  );
};

WalkthroughStep1.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default WalkthroughStep1;
