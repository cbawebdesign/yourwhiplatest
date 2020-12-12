import React, { useRef, useEffect, createRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Video from 'react-native-video';
// import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { ref } from './MediaViewRef';
import { mediaViewStyles as styles } from './styles';
import {
  imagePropType,
  libraryImagePropType,
  photoPropType,
} from '../../../config/propTypes';
import {
  CustomText as Text,
  TITLE_FONT,
  BODY_FONT,
} from '../../text/CustomText';

// DISPLAYS THE POST'S IMAGES OR VIDEO
// FOR EACH ITEM INSIDE THE EXPLORE SCREEN
// Takes the following props:
// media (contains all media display information)
// caption (contains the caption content)

// NOTE: media can be either array of objects (for single or multiple images)
// or a single object (for video);
const adTagUrl =
  'https://pubads.g.doubleclick.net/gampad/ads?slotname=/124319096/external/ad_rule_samples&sz=640x480&ciu_szs=300x250&cust_params=deployment%3Ddevsite%26sample_ar%3Dpremidpostpod&url=https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/tags&unviewed_position_start=1&output=xml_vast3&impl=s&env=vp&gdfp_req=1&ad_rule=0&cue=15000&vad_type=linear&vpos=midroll&pod=2&mridx=1&rmridx=1&ppos=2&min_ad_duration=0&max_ad_duration=30000&vrid=6376&video_doc_id=short_onecue&cmsid=496&kfa=0&tfcd=0';

const MediaView = ({
  media,
  caption,
  itemInView,
  enableAutoPlay,
  onProgress,
}) => {
  let remoteVideoUri;
  let localVideoUri;

  // const videoRef = createRef();
  const videoRef = ref;
  const [paused, setPaused] = useState(true);
  const volume = volume;
  // CHECK IF URL TO DISPLAY IS LOCAL FOLDER VIDEO
  if (
    media.uri ||
    (media[0] && media[0].file && media[0].file.mediaType === 'video')
  ) {
    localVideoUri = media.uri || media[0].file.uri;
  }

  // CHECK IF URL TO DISPLAY REMOTE RESOURCE VIDEO
  if (media[0] && media[0].image && media[0].resourceType === 'video') {
    const isMovVideo = media[0].image.includes('mov');

    // CHANGE URL END TO 'MP4' AS 'MOV' FORMAT IS NOT SUPPORTED
    if (isMovVideo) {
      remoteVideoUri = `${media[0].image.slice(
        0,
        media[0].image.length - 3
      )}mp4`;
    }
    remoteVideoUri = media[0].image;
  }

  const images = media && media.length > 0 ? media : [];

  const getImageWidth = (index) => {
    if (images.length === 1) {
      return styles.$singleLargeImageWidth;
    }

    if (images.length === 2) {
      return styles.$doubleImageWidth;
    }

    if (index === 0) {
      return styles.$multipleLargeImageWidth;
    }

    return styles.$smallImageWidth;
  };

  const getImageHeight = (index) => {
    if (images.length === 1) {
      return styles.$singleLargeImageHeight;
    }

    if (images.length === 2) {
      return styles.$doubleImageHeight;
    }

    if (index === 0) {
      return styles.$multipleLargeImageHeight;
    }

    return styles.$smallImageHeight;
  };

  const getSource = (item) => {
    if (item.uri) {
      return { uri: item.uri };
    }

    if (item.file && item.file.uri) {
      return { uri: item.file.uri };
    }

    return { uri: item.image };
  };

  const renderImage = (item, index) => (
    <View key={index.toString()}>
      <Image
        source={getSource(item)}
        style={[
          styles.image,
          {
            width: getImageWidth(index),
            height: getImageHeight(index),
          },
        ]}
      />
      {images.length > 3 && index === 2 && (
        <View style={styles.photoNumberView}>
          <Text
            text={`+${images.length - 3}`}
            fontFamily={TITLE_FONT}
            style={styles.photoNumber}
          />
        </View>
      )}
    </View>
  );

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    if (!remoteVideoUri) return;

    // console.log('videoRefcurrent is', Object.keys(videoRef.current))
    // if (itemInView) {
    //   videoRef.current.playAsync();
    // } else {
    //   videoRef.current.pauseAsync();
    // }
  }, [itemInView, videoRef, videoRef.current]);

  function onLoad(data) {
    console.log('loaded', data);
  }
  const videoStyle = {
    width: '100%',
    height: '100%',
    // controls: {
    //   backgroundColor: "transparent",
    //   borderRadius: 5,
    //   position: 'absolute',
    //   bottom: 44,
    //   left: 4,
    //   right: 4,
    // },
  };

  return (
    <View
      // style={workingStyles.container}
      style={styles.container}
    >
      <View
        style={{
          width: '100%',
          height: '100%',
          // backgroundColor: 'red',
        }}
      >
        {remoteVideoUri || localVideoUri ? (
          <TouchableWithoutFeedback
            style={videoStyle}
            onPress={() => {
              if (paused) {
                setPaused(false);
              } else {
                setPaused(true);
              }
            }}
          >
            <View
              style={{ width: '100%', height: '100%'}}
            >
              <Video
                source={{ uri: remoteVideoUri || localVideoUri }} // require('./broadchurch.mp4')}
                //source={{uri: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'}}
                // source={require('sample-mp4-file.mp4')}
                ref={videoRef}
                style={videoStyle}
                // controls={false}
                // enableAutoPlay={false}
                controls={true}
                // rate={this.st aate.rate}
                paused={paused}
                volume={volume}
                // muted={this.state.muted}
                // ignoreSilentSwitch={this.state.ignoreSilentSwitch}x
                // resizeMode={this.state.resizeMode}
                // onLoad={(data ) => onLoad(data)}
                // onBuffer={this.onBuffer}
                // onProgress={this.onProgress}
                // onEnd={() => { Alert.alert('Done!') }}
                // repeat={true}
                // controls={this.state.controls}
                // filter={this.state.filter}
                // filterEnabled={this.state.filterEnabled}
                adTagUrl={adTagUrl}
                onProgress={onProgress}
              />
            </View>
          </TouchableWithoutFeedback>
        ) : (
          images.map((item, index) => {
            if (index < 3) {
              return renderImage(item, index);
            }

            return null;
          })
        )}
        {!(remoteVideoUri || localVideoUri) && caption !== '' && (
    <LinearGradient
      pointerEvents="none"
      style={styles.captionGradientView}
      colors={['black', 'transparent']}
      start={[0, 1]}
      end={[0, 0]}
    >
      <Text
        text={caption}
        fontFamily={BODY_FONT}
        style={styles.caption}
        numberOfLines={1}
      />
    </LinearGradient>
  )}
      </View>
    </View>
  );
  //  <Video
  //   ref={videoRef}
  //   source={{ uri: remoteVideoUri || localVideoUri }}
  //   rate={1.0}
  //   volume={1.0}
  //   resizeMode="cover"
  //   isMuted
  //   isLooping
  //   style={styles.video}
  //   useNativeControls
  //   shouldPlay={enableAutoPlay}
  // />
  // ) : (
  // images.map((item, index) => {
  //   if (index < 3) {
  //     return renderImage(item, index);
  //   }

  //   return null;
  // })
  // )}
  // {!(remoteVideoUri || localVideoUri) && caption !== '' && (
  //   <LinearGradient
  //     pointerEvents="none"
  //     style={styles.captionGradientView}
  //     colors={['black', 'transparent']}
  //     start={[0, 1]}
  //     end={[0, 0]}
  //   >
  //     <Text
  //       text={caption}
  //       fontFamily={BODY_FONT}
  //       style={styles.caption}
  //       numberOfLines={1}
  //     />
  //   </LinearGradient>
  // )}
  //   </View>
  // );
};
const workingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  controls: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    position: 'absolute',
    bottom: 44,
    left: 4,
    right: 4,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 3,
    overflow: 'hidden',
  },
  innerProgressCompleted: {
    height: 20,
    backgroundColor: '#cccccc',
  },
  innerProgressRemaining: {
    height: 20,
    backgroundColor: '#2C2C2C',
  },
  generalControls: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    paddingBottom: 10,
  },
  skinControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rateControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  volumeControl: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  resizeModeControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ignoreSilentSwitchControl: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    fontSize: 11,
    color: 'white',
    paddingLeft: 2,
    paddingRight: 2,
    lineHeight: 12,
  },
  nativeVideoControls: {
    top: 184,
    height: 300,
  },
});
MediaView.defaultProps = {
  media: null,
  caption: '',
  // enableAutoPlay: true,
};

MediaView.propTypes = {
  media: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        imagePropType,
        photoPropType,
        libraryImagePropType,
        PropTypes.shape({
          image: PropTypes.string,
        }),
      ])
    ),
    PropTypes.shape({
      uri: PropTypes.string.isRequired,
    }),
  ]),
  caption: PropTypes.string,
  //  enableAutoPlay: PropTypes.bool,
};

export default MediaView;
