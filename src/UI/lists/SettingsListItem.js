import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image, View, Switch } from 'react-native';

import ListItemContainerView from '../views/listItemViews/ListItemContainerView';
import { CustomText as Text, TITLE_FONT, BODY_FONT } from '../text/CustomText';
import IconButton from '../buttons/IconButton';

import { settingsListItemStyles as styles } from './styles';

const arrowRightIcon = require('../../../assets/icons/arrowRight.png');

const SettingsListItem = ({
  item,
  onPress,
  bottomMargin,
  settingsValue,
  toggleSettings,
  hide,
}) => {
  const [userSettings, setUserSettings] = useState({
    enableSuggestions: false,
    enableIntroAnimations: false,
    enableNotifications: false,
  });

  const renderRightSideItem = () => {
    switch (item.type) {
      case 'NAVIGATE':
        return <IconButton icon={arrowRightIcon} onPress={onPress} />;
      case 'ENABLE_SUGGESTIONS':
        return (
          <Switch
            trackColor={{
              false: styles.$inactiveBackground,
              true: styles.$activeBackground,
            }}
            onValueChange={(value) => {
              const settingsCopy = { ...userSettings };
              settingsCopy.enableSuggestions = value;

              toggleSettings(settingsCopy);
              setUserSettings(settingsCopy);
            }}
            value={userSettings.enableSuggestions}
          />
        );
      case 'ENABLE_INTRO_ANIMATIONS':
        return (
          <Switch
            trackColor={{
              false: styles.$inactiveBackground,
              true: styles.$activeBackground,
            }}
            onValueChange={(value) => {
              const settingsCopy = { ...userSettings };
              settingsCopy.enableIntroAnimations = value;

              toggleSettings(settingsCopy);
              setUserSettings(settingsCopy);
            }}
            value={userSettings.enableIntroAnimations}
          />
        );
      case 'ENABLE_NOTIFICATIONS':
        return (
          <Switch
            trackColor={{
              false: styles.$inactiveBackground,
              true: styles.$activeBackground,
            }}
            onValueChange={(value) => {
              const settingsCopy = { ...userSettings };
              settingsCopy.enableNotifications = value;

              toggleSettings(settingsCopy);
              setUserSettings(settingsCopy);
            }}
            value={userSettings.enableNotifications}
          />
        );
      case 'SOCIAL':
        return (
          <Text
            text={item.isLinked ? 'YES' : 'NO'}
            fontFamily={TITLE_FONT}
            style={[styles.linked, { opacity: item.isLinked ? 1 : 0.2 }]}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    setUserSettings((prev) => ({
      ...prev,
      enableSuggestions: settingsValue.enableSuggestions,
      enableIntroAnimations: settingsValue.enableIntroAnimations,
      enableNotifications: settingsValue.enableNotifications,
    }));
  }, [settingsValue]);

  if (hide) return null;

  return (
    <ListItemContainerView
      onPress={onPress}
      height={styles.$containerHeight}
      marginTop={0}
      marginBottom={bottomMargin ? 10 : 0}
      disabled={item.navigateTo === null}
      row
    >
      <Image source={item.icon} style={styles.icon} />
      <Text text={item.title} fontFamily={BODY_FONT} style={styles.title} />
      <View style={styles.rightSideItem}>{renderRightSideItem()}</View>
    </ListItemContainerView>
  );
};

SettingsListItem.defaultProps = {
  bottomMargin: false,
  hide: false,
};

SettingsListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    icon: PropTypes.number.isRequired,
    navigateTo: PropTypes.string,
    isLinked: PropTypes.bool,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
  settingsValue: PropTypes.shape({
    enableIntroAnimations: PropTypes.bool.isRequired,
    enableSuggestions: PropTypes.bool.isRequired,
    enableNotifications: PropTypes.bool.isRequired,
  }).isRequired,
  toggleSettings: PropTypes.func.isRequired,
  bottomMargin: PropTypes.bool,
  hide: PropTypes.bool,
};

export default SettingsListItem;
