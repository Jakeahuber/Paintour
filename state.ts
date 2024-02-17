import { proxy } from 'valtio';

export const state = proxy({
  strokeColor: 'red',
  strokeWidth: 8,
  forceReloadToggle: true,
});