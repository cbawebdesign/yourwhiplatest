import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import MediaView from './listItemViews/MediaView';
import { CustomText as Text, TITLE_FONT } from '../text/CustomText';
import { composeMediaPropType } from '../../config/propTypes';

import { composeViewStyles as styles } from './styles';

// DISPLAYS CENTER COMPOSE VIEW INSIDE THE COMPOSE SCREEN
// Takes the following props:
// descriptionPlaceholder (sets the top TextInput placeholder)
// captionPlaceholder (sets the bottom TextInput placeholder)
// media (contains the array of image URIs)
// descriptionValue (controls the top TextInput value)
// onDescriptionChange (handles the top TextInput changes)
// onCaptionChange (handles the bottom TextInput changes)
// captionValue (controls the bottom TextInput value)

const templateImage = require('../../../assets/images/compose.png');

const ComposeView = ({
  descriptionPlaceholder,
  captionPlaceholder,
  media,
  descriptionValue,
  onDescriptionChange,
  onCaptionChange,
  captionValue,
  galleryName,
}) => {
  const containsVideo =
    media &&
    (media.type === 'video' ||
      (media.images &&
        media.images[0].localUri &&
        (media.images[0].localUri.toLowerCase().includes('mp4') ||
          media.images[0].localUri.toLowerCase().includes('mov'))));

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.descriptionView}>
          <TextInput
            style={[styles.input, styles.inputTop]}
            placeholder={descriptionPlaceholder}
            textAlignVertical="top"
            onChangeText={onDescriptionChange}
            value={descriptionValue}
            multiline
          />
        </View>
        <View style={styles.mediaView}>
          {galleryName !== null && (
            <LinearGradient
              style={styles.galleryView}
              colors={[styles.$gradientColorFrom, styles.$gradientColorTo]}
              start={[0, 1]}
              end={[1, 0]}
            >
              <Text
                text={galleryName}
                fontFamily={TITLE_FONT}
                numberOfLines={1}
              />
            </LinearGradient>
          )}
          {!media ? (
            <Image source={templateImage} style={styles.templateImage} />
          ) : (
            <MediaView
              media={media.video || media.images}
              caption={captionValue}
              enableAutoPlay
            />
          )}
        </View>
        <View
          style={[
            styles.captionView,
            media && !containsVideo && styles.$captionviewHeight,
          ]}
        >
          {media && !containsVideo && (
            <TextInput
              style={styles.input}
              placeholder={captionPlaceholder}
              onChangeText={onCaptionChange}
              value={captionValue}
            />
          )}
        </View>
      </View>
    </View>
  );
};

ComposeView.defaultProps = {
  descriptionPlaceholder: 'Write something...',
  media: null,
  captionPlaceholder: 'Add caption...',
  galleryName: null,
};

ComposeView.propTypes = {
  descriptionPlaceholder: PropTypes.string,
  media: composeMediaPropType,
  captionPlaceholder: PropTypes.string,
  descriptionValue: PropTypes.string.isRequired,
  onDescriptionChange: PropTypes.func.isRequired,
  onCaptionChange: PropTypes.func.isRequired,
  captionValue: PropTypes.string.isRequired,
  galleryName: PropTypes.string,
};

export default ComposeView;
