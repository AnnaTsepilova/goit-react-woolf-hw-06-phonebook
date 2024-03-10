export const getContacts = state => state.contacts.contacts;

export const getFilter = state => state.filter;

export const getVisibleContacts = (contacts, searchQuery) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
};
