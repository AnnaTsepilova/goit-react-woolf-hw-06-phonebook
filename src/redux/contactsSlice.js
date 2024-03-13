import { createSlice } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import initialContacts from '../data/contacts.json';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: initialContacts },
  reducers: {
    addContact(state, action) {
      state.contacts.push(action.payload);
    },
    deleteContact(state, action) {
      const contacts = state.contacts.filter(
        contact => contact.id !== action.payload
      );
      return { contacts: contacts };
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
  whitelist: ['contacts'],
};

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContact, filterContact } =
  contactsSlice.actions;
