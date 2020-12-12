import React, { useState, useEffect } from 'react';
import { Keyboard, AppState, Platform } from 'react-native';

export const useKeyboardState = () => {
  const [keyboardShowing, setKeyboardShowing] = useState(false);
  const [onKeyboardShow, setOnkeyboardShow] = useState(null);
  const [onKeyboardHide, setOnkeyboardHide] = useState(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const keyboardShow = (event) => {
    setKeyboardShowing(true);
    setOnkeyboardShow(event);
    setOnkeyboardHide(null);
    setKeyboardHeight(event.endCoordinates.height);
  };

  const keyboardHide = (event) => {
    setKeyboardShowing(false);
    setOnkeyboardShow(null);
    setOnkeyboardHide(event);
  };

  useEffect(() => {
    const name = Platform.OS === 'ios' ? 'Will' : 'Did';

    AppState.addEventListener = Keyboard.addListener(
      `keyboard${name}Show`,
      keyboardShow
    );
    AppState.addEventListener = Keyboard.addListener(
      `keyboard${name}Hide`,
      keyboardHide
    );

    return () => {
      AppState.removeEventListener = Keyboard.removeListener(
        `keyboard${name}Show`,
        keyboardShow
      );
      AppState.removeEventListener = Keyboard.removeListener(
        `keyboard${name}Hide`,
        keyboardHide
      );
    };
  }, []);

  return { keyboardShowing, onKeyboardShow, onKeyboardHide, keyboardHeight };
};

export default useKeyboardState;
