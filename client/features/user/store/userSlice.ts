import { RootState } from '@/store';
import { UserData } from '@/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { HYDRATE } from 'next-redux-wrapper';

type HydrateAction = {
  type: typeof HYDRATE;
  payload: { user: UserState };
};

export interface UserState {
  data: UserData | null;
}

const initialState: UserState = {
  data: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserData>) {
      state.data = action.payload;
    },
    unSetUser(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: HydrateAction) => {
      return {
        ...state,
        ...action.payload.user,
      };
    });
  },
});

export const userSelectors = {
  user: (state: RootState) => state.user,
  data: (state: RootState) => userSelectors.user(state).data,
};

const { actions: userActions, reducer: userReducer } = userSlice;

export { userActions };

export default userReducer;
