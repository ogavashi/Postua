import { RootState } from '@/store';
import { Language, Theme } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { HYDRATE } from 'next-redux-wrapper';

type HydrateAction = {
  type: typeof HYDRATE;
  payload: { app: AppState };
};

export interface AppState {
  theme: Theme;
  language: Language;
  authModal: boolean;
}

const initialState: AppState = {
  theme: 'auto',
  language: 'ua',
  authModal: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload;
    },
    setAuthModal(state, action: PayloadAction<boolean>) {
      state.authModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: HydrateAction) => {
      return {
        ...state,
        ...action.payload.app,
      };
    });
  },
});

export const appSelectors = {
  app: (state: RootState) => state.app,
  theme: (state: RootState) => appSelectors.app(state).theme,
  language: (state: RootState) => appSelectors.app(state).language,
  authModal: (state: RootState) => appSelectors.app(state).authModal,
};

const { actions: appActions, reducer: appReducer } = appSlice;

export { appActions };

export default appReducer;
