import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity, Animated } from 'react-native';

import ListItemContainerView from '../views/listItemViews/ListItemContainerView';
import IconLabelButton from '../buttons/IconLabelButton';
import HeaderView from '../views/listItemViews/HeaderView';

import { galleryListItemStyles as styles } from './styles';

import { galleryItemPropType } from '../../config/propTypes';

// DISPLAYS THE ITEMS INSIDE THE GALLERY SCREEN
// Takes the following props:
// item (holds all content information)
// onPress (handles the item's main press action)

const ANIMATION_DURATION = 500;

const arrowRightIcon = require('../../../assets/icons/arrowRight.png');
const thumbnailImage = require('../../../assets/images/compose.png');

const GalleryListItem = ({ item, onPress, onOptionsPress, onDeletePress }) => {
  const opacity = new Animated.Value(1);

  const handleDeleteItem = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(() => onDeletePress());
  };

  const imageIndex = item.images.findIndex(
    (img) => img.resourceType === 'image'
  );

  useEffect(() => {
    if (item.deleted) {
      handleDeleteItem();
    }
  }, [item.deleted]);

  return (
    <Animated.View style={{ opacity }}>
      <ListItemContainerView
        height={styles.$containerHeight}
        backgroundColor="transparent"
      >
        <View style={styles.innerContainerDetail}>
          <View style={styles.buttonView}>
            <IconLabelButton
              icon={arrowRightIcon}
              label={item.name}
              isHorizontal
              onPress={onPress}
              height={50}
            />
          </View>
        </View>
        <View style={styles.innerContainerCover}>
          <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
            <View style={styles.coverImageView}>
              <Image
                source={
                  imageIndex > -1
                    ? { uri: item.images[imageIndex].image }
                    : thumbnailImage
                }
                resizeMode={imageIndex > -1 ? 'cover' : 'contain'}
                style={[
                  styles.coverImage,
                  !(imageIndex > -1) && styles.$thumbnailImage,
                ]}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.headerView}>
            <HeaderView
              number={item.images.length.toString()}
              onPressDisabled
              onOptionsPress={onOptionsPress}
            />
          </View>
        </View>
      </ListItemContainerView>
    </Animated.View>
  );
};

GalleryListItem.propTypes = {
  item: galleryItemPropType.isRequired,
  onPress: PropTypes.func.isRequired,
  onOptionsPress: PropTypes.func.isRequired,
  onDeletePress: PropTypes.func.isRequired,
};

export default GalleryListItem;
