import { proxy } from 'valtio';

export const state = proxy({
  strokeColor: 'red',
  strokeWidth: 8,
  forceReloadToggle: true,
  isSignedIn: false,
  uploadedToday: false,
  username: '',
  zoomableCanvas: false,
  offsetX: 0,
  offsetY: 0,
  scale: 1,
  publicPosts: true,
  uid: null,
  profilePicUrl: '',
});