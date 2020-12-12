import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Modal, TouchableWithoutFeedback } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import IconLabelButton from '../buttons/IconLabelButton';
import TextButton from '../buttons/TextButton';

import { CustomText as Text, TITLE_FONT, BODY_FONT } from '../text/CustomText';

import { modalStyles as styles } from './styles';

// DISPLAYS A CUSTOM ALERT MODAL AT BOTTOM OF SCREEN
// Takes the following props:
// showModal (sets the modal to show/hide)
// onModalDismissPress (handles clicking outside the modal to hide the modal)
// options (contains the modal title, body text and action buttons)
// timout (displays the modal with a delay in miliseconds)

const SelectionModal = ({
  showModal,
  onModalDismissPress,
  options,
  timeout,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(showModal);
    }, timeout);
    return () => clearTimeout(timer);
  }, [showModal]);

  return (
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
                text={options.title}
                fontFamily={TITLE_FONT}
                style={[
                  styles.titleText,
                  options.buttonStyle === 'horizontal' && {
                    textAlign: 'center',
                  },
                ]}
              />
              <Text
                text={options.body}
                fontFamily={BODY_FONT}
                style={[
                  styles.bodyText,
                  options.buttonStyle === 'horizontal' && {
                    textAlign: 'center',
                  },
                ]}
              />
              <View
                style={[
                  styles.footerView,
                  options.buttonStyle === 'horizontal'
                    ? styles.$buttonsHorizontal
                    : styles.$buttonsVertical,
                ]}
              >
                {options.buttons.map((item, index) => {
                  if (item.hide) return;
                  if (options.buttonStyle === 'horizontal') {
                    return (
                      <TextButton
                        key={index.toString()}
                        text={item.title}
                        onPress={item.onPress}
                        color="black"
                        uppercase
                        fontSize={14}
                      />
                    );
                  }

                  return (
                    <IconLabelButton
                      key={index.toString()}
                      icon={item.icon}
                      label={item.title}
                      subtitle={item.subtitle}
                      onPress={item.onPress}
                    />
                  );
                })}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

SelectionModal.defaultProps = {
  timeout: 0,
};

SelectionModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onModalDismissPress: PropTypes.func.isRequired,
  options: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    buttonStyle: PropTypes.string,
    buttons: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        icon: PropTypes.node,
        onPress: PropTypes.func,
      })
    ),
  }).isRequired,
  timeout: PropTypes.number,
};

export default SelectionModal;
