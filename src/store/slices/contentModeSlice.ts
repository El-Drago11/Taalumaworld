import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type ContentMode = 'chapters' | 'books';

interface ContentModeState {
  mode: ContentMode;
}

const loadModeFromStorage = (): ContentMode => {
  // First check the new key
  let savedMode = localStorage.getItem('display-mode');
  
  // If not found, check the old key for migration
  if (!savedMode) {
    savedMode = localStorage.getItem('taaluma_content_mode');
    if (savedMode) {
      // Migrate from old key to new key
      localStorage.setItem('display-mode', savedMode);
      localStorage.removeItem('taaluma_content_mode');
    }
  }
  
  if (savedMode === 'books' || savedMode === 'chapters') {
    return savedMode;
  }
  return 'chapters';
};

const initialState: ContentModeState = {
  mode: loadModeFromStorage(),
};

export const contentModeSlice = createSlice({
  name: 'contentMode',
  initialState,
  reducers: {
    setContentMode: (state, action: PayloadAction<ContentMode>) => {
      state.mode = action.payload;
      localStorage.setItem('display-mode', action.payload);
      
      // Dispatch custom event for non-React listeners
      window.dispatchEvent(new CustomEvent('displayModeChange', { detail: action.payload }));
    },
    
    toggleContentMode: (state) => {
      state.mode = state.mode === 'chapters' ? 'books' : 'chapters';
      localStorage.setItem('display-mode', state.mode);
      
      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('displayModeChange', { detail: state.mode }));
    },
  },
});

export const { setContentMode, toggleContentMode } = contentModeSlice.actions;

// Selectors
export const selectContentMode = (state: RootState) => state.contentMode.mode;

export default contentModeSlice.reducer;