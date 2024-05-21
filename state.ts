import { proxy } from 'valtio';

export const state = proxy({
  strokeColor: 'black',
  strokeWidth: 8,
  forceReloadToggle: true,
  zoomableCanvas: false,
  offsetX: 0,
  offsetY: 0,
  scale: 1,
  promptHidden: false,
  forceUserSketchesUpdate: false,
  prompt: '',
  forceCalendarImagesRerender: false,
  currentProfileUid: '',

  uid: '',
  username: '',
  profilePicture: '',
  numFriends: 0,
  numSketches: 0,
  numRequests: 0,
  uploadedToday: false,
  friendSketches: [],
  userSketches: [],
  requests: [],
});