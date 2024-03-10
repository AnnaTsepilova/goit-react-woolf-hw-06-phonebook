import { createSlice } from '@reduxjs/toolkit';

const filterInitialState = {
  filter: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    setFilterContact(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { setFilterContact } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
