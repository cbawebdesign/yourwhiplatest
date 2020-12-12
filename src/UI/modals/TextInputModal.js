import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Platform,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import TextButton from '../buttons/TextButton';
import { CustomText as Text, TITLE_FONT, BODY_FONT } from '../text/CustomText';

import { useKeyboardState } from '../../config/hooks';

import { modalStyles as styles } from './styles';

// DISPLAYS SHARE COMPOSE MODAL
// Takes the following props:
// showModal (controls the modal's visibility)
// onOptionsPress (action that displays the native view with selections for
// sharing with other apps)
// onModalDispmissPress (actions that hides the share modal)
// onChangeText (action that updates the share message)
// descriptionValue (controls the content of the share message)

const TextInputModal = ({
  showModal,
  onSavePress,
  onCancelPress,
  onModalDismissPress,
  onChangeText,
  inputValue,
  title,
  body,
  placeholder,
  multiline,
}) => {
  const safeAreaBottom = 8 + useSafeArea().bottom;
  const { onKeyboardShow } = useKeyboardState();

  const [paddingBottom, setPaddingBottom] = useState(safeAreaBottom);

  useEffect(() => {
    if (onKeyboardShow) {
      setPaddingBottom(onKeyboardShow.endCoordinates.height);
    }
  });

  return (
    <View style={[styles.centeredView, showModal && styles.$zIndex]}>
      <Modal animationType="fade" transparent visible={showModal}>
        <TouchableWithoutFeedback onPress={onModalDismissPress}>
          <View
            style={[
              styles.centeredView,
              showModal && { backgroundColor: styles.$activeColor },
            ]}
          >
            <View
              style={[
                styles.modalView,
                { paddingBottom: Platform.OS === 'ios' ? paddingBottom : 0 },
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
                <TextInput
                  style={[styles.input, multiline && styles.$multilineInput]}
                  placeholder={placeholder}
                  onChangeText={onChangeText}
                  value={inputValue || null}
                  multiline={multiline}
                  textAlignVertical="top"
                />
              </View>
              <View style={styles.footerView}>
                <TextButton
                  text="Cancel"
                  fontSize={14}
                  color="black"
                  uppercase
                  onPress={onCancelPress}
                />
                <TextButton
                  text="Save"
                  fontSize={14}
                  color="black"
                  uppercase
                  onPress={onSavePress}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

TextInputModal.defaultProps = {
  inputValue: null,
  title: '',
  body: '',
  placeholder: '',
};

TextInputModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onSavePress: PropTypes.func.isRequired,
  onCancelPress: PropTypes.func.isRequired,
  onModalDismissPress: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  placeholder: PropTypes.string,
};

export default TextInputModal;
