import { createSlice } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import initialContacts from 'components/data/contacts.json';

const contactsSlice = createSlice({
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
    filterContact(state, action) {
      return state.contacts.filter(contact =>
        contact.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const { addContact, deleteContact, filterContact } =
  contactsSlice.actions;

export const contactsReducer = persistReducer(
  { key: 'contacts', storage },
  contactsSlice.reducer
);
