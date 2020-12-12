import * as MediaLibrary from 'expo-media-library';

const saveToLibrary = (uri) =>
  new Promise((resolve, reject) => {
    MediaLibrary.getPermissionsAsync().then((data) => {
      if (data.status === 'granted') {
        MediaLibrary.saveToLibraryAsync(uri);

        resolve('Photo successfully saved');
      }

      MediaLibrary.requestPermissionsAsync().then((nextData) => {
        if (nextData.status === 'granted') {
          MediaLibrary.saveToLibraryAsync(uri);

          resolve('Photo successfully saved');
        }

        reject(
          new Error(
            'You must give permissions in order to save to your media folder'
          )
        );
      });
    });
  });

export default saveToLibrary;
