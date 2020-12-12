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
// onShareOptionsPress (action that displays the native view with selections for
// sharing with other apps)
// onModalDispmissPress (actions that hides the share modal)
// onChangeText (action that updates the share message)
// descriptionValue (controls the content of the share message)

const ShareModal = ({
  showModal,
  onSharePress,
  onShareOptionsPress,
  onModalDismissPress,
  onChangeText,
  descriptionValue,
}) => {
  const safeAreaBottom = 8 + useSafeArea().bottom;
  const { onKeyboardShow } = useKeyboardState();

  const [paddingBottom, setPaddingBottom] = useState(safeAreaBottom);

  useEffect(() => {
    if (onKeyboardShow) {
      setPaddingBottom(onKeyboardShow.endCoordinates.height);
    }
  }, [onKeyboardShow]);

  return (
    <View style={styles.centeredView}>
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
                text="Share this post"
                fontFamily={TITLE_FONT}
                style={styles.titleText}
              />
              <Text
                text="Found something interesting? Share it with your friends on SHARE or other social platforms!"
                fontFamily={BODY_FONT}
                style={styles.bodyText}
              />
              <View style={styles.contentView}>
                <TextInput
                  style={[styles.input, styles.$shareInput]}
                  placeholder="Write something..."
                  multiline
                  onChangeText={onChangeText}
                  textAlignVertical="top"
                  value={descriptionValue}
                />
              </View>
              <View style={styles.footerView}>
                <TextButton
                  text="Share"
                  fontSize={14}
                  color="black"
                  uppercase
                  onPress={onSharePress}
                />
                <TextButton
                  text="Options"
                  fontSize={14}
                  color="black"
                  uppercase
                  onPress={onShareOptionsPress}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

ShareModal.defaultProps = {
  descriptionValue: null,
};

ShareModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  onSharePress: PropTypes.func.isRequired,
  onShareOptionsPress: PropTypes.func.isRequired,
  onModalDismissPress: PropTypes.func.isRequired,
  onChangeText: PropTypes.func.isRequired,
  descriptionValue: PropTypes.string,
};

export default ShareModal;
