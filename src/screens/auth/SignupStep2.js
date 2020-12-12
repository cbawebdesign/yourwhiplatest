import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, connect } from 'react-redux';
import {
  View,
  Keyboard,
  ScrollView,
  ImageBackground,
  Platform,
} from 'react-native';
import * as Location from 'expo-location';

import ContainerView from '../../UI/views/ContainerView';
import PersonalDisplayView from '../../UI/views/PersonalDisplayView';
import PersonalInputView from '../../UI/views/PersonalInputView';
import AuthButtonView from '../../UI/views/AuthButtonView';
import DatePickerModal from '../../UI/modals/datePickerModal';
import SelectionModal from '../../UI/modals/SelectionModal';

import { signupStep2, resetMessages } from '../../actions/auth';
import { editProfile } from '../../actions/user';

import { userPropType } from '../../config/propTypes';
import { getMonthHelper } from '../../helpers/dateTimeHelper';
import { CAMERA, SIGNUP_STEP_2, SIGNUP_STEP_3 } from '../../config/constants';

import styles from '../styles';

const backgroundImage = '';
const arrowRightIcon = require('../../../assets/icons/arrowRight.png');

const getBirthdayValue = (birthdayValue) => {
  const dateObject = new Date(birthdayValue);

  return `${
    getMonthHelper[dateObject.getMonth()]
  } ${dateObject.getDate()}, ${dateObject.getFullYear()} `;
};

const SignUpStep2 = ({
  route,
  navigation,
  fetching,
  error,
  success,
  currentUser,
}) => {
  const dispatch = useDispatch();

  const { fromScreen, photo } = route.params;

  const [birthday, setBirthday] = useState(
    currentUser ? currentUser.birthday : null
  );
  const [gender, setGender] = useState(currentUser ? currentUser.gender : null);
  const [location, setLocation] = useState(
    currentUser ? currentUser.location : ''
  );
  const [birthdayActive, setbirthdayActive] = useState(false);
  const [genderActive, setgenderActive] = useState(false);
  const [locationActive, setlocationActive] = useState(false);
  const [address, setAddress] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [showImageTypeModal, setShowImageTypeModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputBlockOptions = [
    {
      icon: 'birthday',
      type: 'BIRTHDAY',
      placeholder: 'Birthday',
      value: birthday ? getBirthdayValue(birthday) : '',
      active: birthdayActive,
      hasModalInput: true,
      onPress: () => handleInputPress('BIRTHDAY'),
    },
    {
      icon: 'gender',
      type: 'GENDER',
      placeholder: 'Gender',
      value: gender,
      active: genderActive,
      hasModalInput: true,
      onPress: () => handleInputPress('GENDER'),
    },
    {
      icon: 'location',
      type: 'LOCATION',
      placeholder: 'Location',
      value: location,
      active: locationActive,
      hasModalInput: true,
      onPress: () => handleInputPress('LOCATION'),
    },
  ];

  const imageTypeOptions = {
    title: 'Make your selection',
    body: 'Select an image from your album or take a picture',
    buttons: [
      {
        title: 'Select from album',
        icon: arrowRightIcon,
        onPress: () => handleSelectionPress('SELECT_FROM_ALBUM'),
      },
      {
        title: 'Take a picture',
        icon: arrowRightIcon,
        onPress: () => handleSelectionPress('TAKE_PICTURE'),
      },
    ],
  };

  const genderOptions = {
    title: 'Select your gender',
    body: 'Make your selection from one of the options below',
    buttons: [
      {
        title: 'Male',
        icon: arrowRightIcon,
        onPress: () => handleGenderSelect('Male'),
      },
      {
        title: 'Female',
        icon: arrowRightIcon,
        onPress: () => handleGenderSelect('Female'),
      },
      {
        title: 'None provided',
        icon: arrowRightIcon,
        onPress: () => handleGenderSelect('None provided'),
      },
    ],
  };

  const locationOptions = {
    title: 'Your location',
    body:
      locationError ||
      `Your location will be set to: ${address}. Do you want to use this location?`,
    buttonStyle: 'horizontal',
    buttons: [
      {
        title: 'Accept',
        icon: arrowRightIcon,
        onPress: () => {
          setLocation(address);
          setlocationActive(false);
        },
      },
      {
        title: 'Remove',
        icon: arrowRightIcon,
        onPress: () => {
          setLocation();
          setlocationActive(false);
        },
      },
    ],
  };

  const handleRemoveKeyboard = () => {
    Keyboard.dismiss();
    setbirthdayActive(false);
    setgenderActive(false);
    setlocationActive(false);
  };

  const handleInputPress = (type) => {
    switch (type) {
      case 'BIRTHDAY':
        setbirthdayActive(true);
        setgenderActive(false);
        setlocationActive(false);
        break;
      case 'GENDER':
        setbirthdayActive(false);
        setgenderActive(true);
        setlocationActive(false);
        break;
      case 'LOCATION':
        if (!address) {
          getLocationPermissions();
        } else {
          setlocationActive(true);
        }
        setbirthdayActive(false);
        setgenderActive(false);
        break;
      default:
        break;
    }
  };

  const handleSelectionPress = (type) => {
    // EMPTY EXISTING PARAMS BEFORE SETTING NEW ONES
    navigation.setParams({
      ...route.params,
      photo: null,
      selection: null,
      video: null,
    });

    switch (type) {
      case 'SELECT_FROM_ALBUM':
        navigation.navigate('ImagePicker', {
          fromScreen: SIGNUP_STEP_2,
        });
        setShowImageTypeModal(false);
        break;
      case 'TAKE_PICTURE':
        navigation.navigate(CAMERA, {
          type: 'PHOTO',
          fromScreen: SIGNUP_STEP_2,
        });
        setShowImageTypeModal(false);
        break;
      default:
        break;
    }
  };

  const handleDatePickerSelect = () => {
    if (birthday === null) {
      setBirthday(new Date(Date.now()));
    }
    setbirthdayActive(false);
  };

  const handleDatePickerChange = (event, selectedDate) => {
    if (Platform.OS === 'ios') {
      setBirthday(selectedDate);
    } else {
      setbirthdayActive(false);
      setBirthday(selectedDate);
    }
  };

  const handleGenderSelect = (type) => {
    setGender(type);
    setgenderActive(false);
  };

  const handleStartPress = () => {
    if (fromScreen === 'SETTINGS') {
      dispatch(
        editProfile({
          profileImage: photo || currentUser.profileImage,
          birthday,
          gender,
          location,
        })
      );
    } else {
      dispatch(
        signupStep2({
          profileImage: photo || '',
          birthday,
          gender,
          location,
        })
      );
      navigation.navigate(SIGNUP_STEP_3);
    }
  };

  const getLocationPermissions = async () => {
    const { status } = await Location.requestPermissionsAsync();

    if (status !== 'granted') {
      setLocationError('Permission to access location was denied');

      return;
    }

    setLoading(true);
    const locationObject = await Location.getCurrentPositionAsync({});
    const addressObject = await Location.reverseGeocodeAsync({
      latitude: locationObject.coords.latitude,
      longitude: locationObject.coords.longitude,
    });

    setAddress(`${addressObject[0].city}, ${addressObject[0].country}`);

    setlocationActive(true);
    setLoading(false);
  };

  useEffect(() => {
    handleRemoveKeyboard();

    navigation.setParams({
      ...route.params,
      title: fromScreen === 'SETTINGS' ? 'Edit Profile' : 'Signup (Step 2)',
    });
  }, []);

  useEffect(() => {
    if (success && (success.signupSuccess || success.editProfileSuccess)) {
      navigation.goBack();
      dispatch(resetMessages());
    }
  }, [error, success]);

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <ContainerView
        onPress={handleRemoveKeyboard}
        backgroundColor="transparent"
        loadingOptions={{ loading: fetching || loading }}
        headerHeight={route.params.headerHeight}
      >
        <SelectionModal
          showModal={showImageTypeModal}
          onModalDismissPress={() => setShowImageTypeModal(false)}
          options={imageTypeOptions}
        />
        <DatePickerModal
          showModal={birthdayActive}
          title="Select a date"
          body="Apply the scroll wheels to select your birth date"
          onSelectPress={handleDatePickerSelect}
          onChange={handleDatePickerChange}
          dateValue={birthday}
          onModalDismissPress={() => {
            setbirthdayActive(false);
            setBirthday(null);
          }}
        />
        <SelectionModal
          showModal={genderActive}
          options={genderOptions}
          timeout={500}
          onModalDismissPress={() => {
            setgenderActive(false);
            setGender(null);
          }}
        />
        <SelectionModal
          showModal={locationActive}
          options={locationOptions}
          timeout={500}
          onModalDismissPress={() => {
            setlocationActive(false);
            setLocation(null);
          }}
        />
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          keyboardShouldPersistTaps="always"
        >
          <View style={[styles.topView, styles.$authProfileImage]}>
            <PersonalDisplayView
              onPhotoPress={() => setShowImageTypeModal(true)}
              profileImage={
                photo || (currentUser ? currentUser.profileImage : null)
              }
            />
          </View>
          <View style={styles.inputView}>
            <PersonalInputView inputOptions={inputBlockOptions} />
          </View>
          <View style={[styles.buttonView, locationActive && styles.$active]}>
            <AuthButtonView
              onStartPress={handleStartPress}
              mainButtonText={fromScreen === 'SETTINGS' ? 'SAVE' : 'NEXT'}
            />
          </View>
        </ScrollView>
      </ContainerView>
    </ImageBackground>
  );
};

SignUpStep2.defaultProps = {
  error: null,
  success: null,
  currentUser: null,
};

SignUpStep2.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.string,
  success: PropTypes.objectOf(PropTypes.string),
  currentUser: userPropType,
};

const mapStateToProps = (state) => {
  const { fetching } = state.auth;
  const { user, success, error, editProfileFetching } = state.user;

  return {
    fetching: fetching || editProfileFetching,
    error,
    success,
    currentUser: user,
  };
};

export default connect(mapStateToProps)(SignUpStep2);
