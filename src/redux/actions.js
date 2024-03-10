import { createAction } from '@reduxjs/toolkit';

export const addContactAction = createAction('contacts/addContact');

export const deleteContactAction = createAction('contacts/deleteContact');

export const setFilterContactAction = createAction('filter/setFilterContact');
