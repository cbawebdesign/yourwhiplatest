import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Modal, Alert } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useSafeArea } from 'react-native-safe-area-context';

import { API_HOST } from '../../config/constants';
import FeedSocialView from '../views/listItemViews/FeedSocialView';
import IconButton from '../buttons/IconButton';
import { CustomText as Text, BODY_FONT } from '../text/CustomText';
import FooterMenu from '../views/footer/FooterMenuView';
import ShareModal from './ShareModal';

import saveToLibraryHelper from '../../helpers/mediaLibraryHelper';

import { photoModalStyles as styles } from './styles';
import { imagePropType } from '../../config/propTypes';

const menuIcon = require('../../../assets/icons/menu.png');

const PhotoModal = ({
  items,
  showIndex,
  currentUser,
  showModal,
  onSwipeDown,
  onLikePress,
  onCommentPress,
  onShareOptionsPress,
  onDescriptionChange,
  shareDescriptionValue,
  onSharePress,
  onShare,
}) => {
  let timer;

  const paddingBottom = useSafeArea().bottom;

  const [currentIndex, setCurrentIndex] = useState(null);
  const [hideViews, sethideViews] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveImage = async () => {
    const index = currentIndex > 0 ? currentIndex : showIndex;

    if (items[index] && items[index].image) {
      try {
        saveToLibraryHelper(items[index].image).then(() => {
          setShowSuccess(true);

          timer = setTimeout(() => {
            setShowSuccess(false);
          }, 1500);
        });
      } catch (error) {
        Alert.alert(error);
      }
    } else {
      // TODO: ONLY IMAGES FROM URI CAN BE SAVED TO LIBRARY
    }

    setShowMenu(false);
  };

  const getImages = () => {
    return items.map((item) => ({
      url: item.image || '',
    }));
  };

  useEffect(() => {
    return () => clearTimeout(timer);
  });

  const renderSocialView = (index) => (
    <View style={[styles.footerViewContainer, { paddingBottom }]}>
      <View style={styles.socialView}>
        <FeedSocialView
          item={items[index]}
          currentUser={currentUser}
          onLikePress={() => onLikePress(items[currentIndex || showIndex])}
          onCommentsPress={() =>
            onCommentPress(items[currentIndex || showIndex])
          }
          onSharePress={() => {
            setShowShareModal(true);
            onSharePress(currentIndex || showIndex);
          }}
        />
      </View>
      {showMenu && (
        <FooterMenu
          onCancelPress={() => setShowMenu(false)}
          onSavePress={handleSaveImage}
        />
      )}
      {showShareModal && (
        <ShareModal
          showModal={showShareModal}
          animationType="slide"
          onSharePress={() => {
            onShare();
            setShowShareModal(false);
          }}
          onShareOptionsPress={onShareOptionsPress}
          onModalDismissPress={() => setShowShareModal(false)}
          onChangeText={(text) => onDescriptionChange(text)}
          descriptionValue={shareDescriptionValue}
        />
      )}
      {showSuccess && (
        <View style={styles.successView}>
          <Text
            text="Saved successfully"
            fontFamily={BODY_FONT}
            style={styles.successText}
          />
        </View>
      )}
    </View>
  );

  const renderHeaderView = () => (
    <View style={styles.headerView}>
      <IconButton
        icon={menuIcon}
        onPress={() => {
          setShowMenu(!showMenu);
          sethideViews(false);
        }}
        tintColor="white"
      />
      {!hideViews && (
        <Text
          text="Swipe down image to go back"
          fontFamily={BODY_FONT}
          style={styles.returnText}
        />
      )}
    </View>
  );

  return (
    <View>
      <Modal animationType="fade" transparent visible={showModal}>
        {showModal && (
          <ImageViewer
            imageUrls={getImages()}
            index={showIndex}
            onClick={() => sethideViews(!hideViews)}
            onChange={(index) => setCurrentIndex(index)}
            enableSwipeDown
            onSwipeDown={onSwipeDown}
            renderIndicator={() => null}
            renderHeader={() => renderHeaderView()}
            footerContainerStyle={styles.footerContainer}
            renderFooter={(index) => !hideViews && renderSocialView(index)}
            saveToLocalByLongPress={false}
          />
        )}
      </Modal>
    </View>
  );
};

PhotoModal.defaultProps = {
  // SHARE IS DISABLED FOR POSTS BY CURRENT USER
  // AND GALLERY IMAGES
  onShareOptionsPress: null,
  onDescriptionChange: null,
  shareDescriptionValue: null,
  onSharePress: null,
};

PhotoModal.propTypes = {
  items: PropTypes.arrayOf(imagePropType).isRequired,
  showIndex: PropTypes.number.isRequired,
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  showModal: PropTypes.bool.isRequired,
  onSwipeDown: PropTypes.func.isRequired,
  onLikePress: PropTypes.func.isRequired,
  onCommentPress: PropTypes.func.isRequired,
  onShareOptionsPress: PropTypes.func,
  onDescriptionChange: PropTypes.func,
  shareDescriptionValue: PropTypes.string,
  onSharePress: PropTypes.func,
};

export default PhotoModal;
