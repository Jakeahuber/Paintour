import { proxy } from 'valtio';

export const state = proxy({
  strokeColor: 'red',
  strokeWidth: 8,
  forceReloadToggle: true,
  isSignedIn: false,
  uploadedToday: false,
  zoomableCanvas: false,
  offsetX: 0,
  offsetY: 0,
  scale: 1,
  publicPosts: true,
  promptHidden: false,
  forceUserSketchesUpdate: false,
  prompt: '',

  uid: '',
  username: '',
  profilePicture: '',
  numFriends: 0,
  numSketches: 0,
  numRequests: 0,
  friendSketches: [],
  userSketches: [],
  requests: [],
});