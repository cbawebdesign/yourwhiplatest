import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import ContainerView from '../../UI/views/ContainerView';
import PhotoListItem from '../../UI/lists/PhotoListItem';
import PhotoModal from '../../UI/modals/PhotoModal';
import {
  onLikePressHelper,
  onNewCommentHelper,
} from '../../helpers/socialHelpers';

import { likeImagePress } from '../../actions/detail';
import { resetCommentUpdateCheck } from '../../actions/comments';

import styles from '../styles';

const GalleryDetail = ({
  route,
  navigation,
  currentUser,
  commentsUpdateCheck,
  detailPost,
}) => {
  const dispatch = useDispatch();

  const paddingBottom = useSafeArea().bottom;

  const [showImages, setShowImages] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [feed, setFeed] = useState(route.params.items);

  const handlePress = (index) => {
    setImageIndex(index);
    setShowImages(true);
  };

  const handleLikePress = (item) => {
    dispatch(likeImagePress(item._id));
    setFeed((feedList) => onLikePressHelper(currentUser._id, feedList, item));
  };

  const handleCommentPress = (item) => {
    setShowImages(false);

    navigation.navigate('Comments', {
      type: 'IMAGE',
      fromScreen: 'GALLERY_DETAIL',
      image: item,
      createdBy: currentUser,
    });
  };

  const updateCommentButtonView = () => {
    // ADD NEW COMMENT ON RETURN FROM 'COMMENT'
    const updatedImageFeed = onNewCommentHelper(
      currentUser._id,
      feed,
      commentsUpdateCheck
    );

    setFeed(updatedImageFeed);

    dispatch(resetCommentUpdateCheck());
  };

  useLayoutEffect(() => {
    // UPDATE HEADERTITLE (ALL HEADER TITLES ARE SET INSIDE ROUTES.JS)
    navigation.setParams({
      ...route.params,
      title: route.params.name,
    });
  }, []);

  useEffect(() => {
    // DO UPDATE CHECK AFTER RETURNING FROM COMMENT SCREEN
    if (
      commentsUpdateCheck !== null &&
      commentsUpdateCheck.fromScreen === 'GALLERY_DETAIL'
    ) {
      updateCommentButtonView();
    }
  }, [route, detailPost, commentsUpdateCheck]);

  return (
    <ContainerView
      touchEnabled={false}
      headerHeight={route.params.headerHeight}
    >
      {showImages && (
        <PhotoModal
          showModal={showImages}
          showIndex={imageIndex}
          items={feed}
          currentUser={currentUser}
          onSwipeDown={() => setShowImages(false)}
          onLikePress={(item) => handleLikePress(item)}
          onCommentPress={(item) => handleCommentPress(item)}
          onSharePress={() => null}
        />
      )}
      <FlatList
        contentContainerStyle={[styles.contentContainer, { paddingBottom }]}
        data={feed}
        renderItem={({ item, index }) => (
          <PhotoListItem
            item={item}
            currentUser={currentUser}
            onPress={() => handlePress(index)}
            onLikePress={() => handleLikePress(item)}
            onCommentPress={() => handleCommentPress(item)}
            onSharePress={() => null}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </ContainerView>
  );
};

GalleryDetail.defaultProps = {
  newCommentCheck: null,
};

GalleryDetail.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  currentUser: PropTypes.objectOf(PropTypes.any).isRequired,
  newCommentCheck: PropTypes.shape({
    fromScreen: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = (state) => {
  const { user } = state.user;
  const { commentsUpdateCheck } = state.comments;
  const { detailPost } = state.detail;

  return {
    currentUser: user,
    commentsUpdateCheck,
    detailPost,
  };
};

export default connect(mapStateToProps)(GalleryDetail);
