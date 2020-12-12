import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Modal, TouchableWithoutFeedback, Platform } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

import TextButton from '../buttons/TextButton';
import { CustomText as Text, TITLE_FONT, BODY_FONT } from '../text/CustomText';

import { modalStyles as styles } from './styles';

// DISPLAYS A CUSTOM ALERT MODAL AT BOTTOM OF SCREEN
// Takes the following props:
// showModal (sets the modal to show/hide)
// onModalDismissPress (handles clicking outside the modal to hide the modal)
// options (contains the modal title, body text and action buttons)

const DatePickerModal = ({
  showModal,
  onSelectPress,
  onModalDismissPress,
  title,
  body,
  onChange,
  dateValue,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(showModal);
    }, 500);
    return () => clearTimeout(timer);
  }, [showModal]);

  return (
    <>
      {Platform.OS === 'ios' ? (
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent
            visible={!showModal ? showModal : visible}
          >
            <TouchableWithoutFeedback onPress={onModalDismissPress}>
              <View
                style={[
                  styles.centeredView,
                  {
                    backgroundColor: showModal && styles.$activeColor,
                  },
                ]}
              >
                <View
                  style={[
                    styles.modalView,
                    { paddingBottom: 12 + useSafeArea().bottom },
                  ]}
                >
                  <Text
                    text={title}
                    fontFamily={TITLE_FONT}
                    style={styles.titleText}
                  />
                  <Text
                    text={body}
                    fontFamily={BODY_FONT}
                    style={styles.bodyText}
                  />
                  <View style={styles.contentView}>
                    <DateTimePicker
                      value={new Date(dateValue) || Date.now()}
                      mode="date"
                      display="default"
                      onChange={onChange}
                      maximumDate={Date.now()}
                    />
                  </View>
                  <View style={styles.footerView}>
                    <TextButton
                      text="Select"
                      onPress={onSelectPress}
                      color="black"
                      fontSize={16}
                      uppercase
                    />
                    <TextButton
                      text="Cancel"
                      onPress={onModalDismissPress}
                      color="black"
                      fontSize={16}
                      uppercase
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      ) : (
        <>
          {!showModal
            ? showModal
            : visible && (
                <DateTimePicker
                  value={new Date(dateValue) || Date.now()}
                  mode="date"
                  display="default"
                  onChange={onChange}
                  maximumDate={Date.now()}
                />
              )}
        </>
      )}
    </>
  );
};

DatePickerModal.defaultProps = {
  title: '',
  body: '',
  dateValue: null,
};

DatePickerModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onSelectPress: PropTypes.func.isRequired,
  onModalDismissPress: PropTypes.func.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  dateValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
};

export default DatePickerModal;
