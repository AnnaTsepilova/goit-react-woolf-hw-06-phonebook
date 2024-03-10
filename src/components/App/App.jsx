import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './App.module.css';
import cssText from '../ContactsList/ContactsList.module.css';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactsList from 'components/ContactsList/ContactsList';
import Section from 'components/Section/Section';
import Filter from 'components/Filter/Filter';

import initialContacts from '../../data/contacts.json';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) || initialContacts
    );
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    const contact = { id: nanoid(), ...data };

    let isContactName = contacts.filter(contact =>
      contact.name.toLowerCase().includes(data.name.toLowerCase())
    );

    if (isContactName.length) {
      toast.warn(`${data.name} is already in contacts`);
      return;
    }

    let isContactNumber = contacts.filter(contact =>
      contact.number.toLowerCase().includes(data.number.toLowerCase())
    );

    if (isContactNumber.length) {
      toast.warn(`${data.number} is already in contacts`);
      return;
    }

    setContacts(prevState => [...prevState, contact]);
    toast.success('Contact was added');
  };

  const handleFilter = value => {
    setFilter(value);
  };

  const getContacts = () => {
    let results = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (!results.length) {
      toast.warn('Contact wasn`t found');
    }
    return results;
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
    toast.success('Contact is deleted');
  };

  return (
    <section className={css.sectionWrapper}>
      <h1 className={css.title}>Phonebook</h1>
      <Section>
        <ContactForm onSubmit={formSubmitHandler} />
      </Section>
      <Section title="Contacts">
        <Filter filterByName={handleFilter} />
        {contacts.length ? (
          <ContactsList contacts={getContacts()} onDelete={deleteContact} />
        ) : (
          <span className={cssText.text}>
            There is no contact in your phonebook. Add your first!
          </span>
        )}
      </Section>
      <ToastContainer />
    </section>
  );
};

export default App;
