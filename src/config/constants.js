// APP & COMPANY INFO
// THESE ARE APPLIED IN THE 'SIGNUP_STEP_3' SCREEN
export const APP_NAME = 'YourWhip';
export const COMPANY_NAME = 'YourWhip LLC';
export const CONTACT_EMAIL = 'info@yourwhip.com';

// APISERVER URLS
const DEVELOPMENT_API_HOST = 'http://localhost:4000';
const PRODUCTION_API_HOST = 'https://yourwhip.herokuapp.com';

const development = false;

export const API_HOST = development
  ? DEVELOPMENT_API_HOST
  : PRODUCTION_API_HOST;

// CHANGE INNER & OUTER MARGINS LEFT / RIGHT SETTINGS
// FOR LIST ITEM BLOCKS ON ALL SCREENS
// (EMPTY SPACE BETWEEN SCREEN EDGE AND CONTENT ITEM BLOCKS)
export const OUTER_CONTAINER_MARGIN_LEFT_RIGHT = 50;
export const INNER_CONTAINER_MARGIN_LEFT_RIGHT = 50;

// CHANGE INFINITE SCROLL SETTINGS
export const PAGINATION_LIMIT = 8;

// CHANGE SOCIAL BAR SETTINGS
export const ENABLE_LIKE_ANIMATION_1 = true;
export const ENABLE_LIKE_ANIMATION_2 = false;

// ENABLE USER'S ABILITY TO LIKE OWN POSTS /
// COMMENTS / REPLIES SETTING
export const ENABLE_LIKE_YOURSELF = true;

// VIDEO VIEW DURATION CONSTANT IN SECONDS
export const VIDEO_VIEW_DURATION_FOR_VIEW = 3;

// PROFILE: DEfAULT STATUS MESSAGE SETTING
export const PERSONAL_DESCRIPTION = 'I love Cars!';

// DISCOVER SCREEN INTEREST CATEGORIES SETTINGS
export const SELECTIONS = [
  // TOP LIST
  ['Donks', 'Gbody', 'Old School (custom)', 'Muscle', 'SUV'],
  // MIDDLE LIST
  [ 'Trucks', 'Bikes', 'Lowrider'],
  // BOTTOM LIST
  ['Tuner', 'Slabs', 'Hotrods', 'Celebrity Whips', 'Classic'],
];

// CHANGE SCREEN TITLES SETTINGS
export const LOGIN = 'Login';
export const SIGNUP_STEP_1 = 'Signup (Step 1)';
export const SIGNUP_STEP_2 = 'Signup (Step 2)';
export const SIGNUP_STEP_3 = 'Finish Signing Up';
export const HELP = 'Help';
export const CODE = 'Code';
export const PASSWORD = 'Password';
export const CAMERA = 'Camera';

export const WALKTHROUGH = 'Walkthrough';
export const DISCOVER = 'Discover';

export const MEDIA_ALBUMS = 'Media Albums';
export const MEDIA = 'Media';

export const EXPLORE = 'Explore';
export const GALLERY = 'Gallery';
export const GALLERY_DETAIL = 'GalleryDetail';
export const PROFILE = 'Profile';
export const PEOPLE = 'Channels';
export const TIMELINE = 'Timeline';
export const SETTINGS = 'Settings';
export const STATS = 'Stats';
export const EXPLORE_DETAIL = 'ExploreDetail';
export const FLAGGED = 'Flagged';

export const COMPOSE = 'Compose';
export const NAVIGATION = 'Navigation';
export const COMMENTS = 'Comments';
export const SEARCH = 'Search';
export const REPLIES = 'Replies';

// CHANGE COLOR SETTINGS
export const COLORS = {
  primary1: '#3b5998',
  primary2: '#FFFFFF',
  primaryBackground: '#FFF',
  black: '#020202',
  white: '#fff',
  lightGray: '#C4C4C4',
};

// ONESIGNAL APP ID DEVELOPMENT & PRODUCTION
export const ENABLE_ONESIGNAL_PRIVACY_CONSENT = true; // DON'T CHANGE TO FALSE
export const ONESIGNAL_APP_ID = 'a133640a-8fdd-4df5-b7d0-ced5c967cc26'; // PRODUCTION
