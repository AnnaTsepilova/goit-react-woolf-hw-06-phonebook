import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './App.module.css';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactsList from 'components/ContactsList/ContactsList';
import Section from 'components/Section/Section';
import Filter from 'components/Filter/Filter';

import { useDispatch, useSelector } from 'react-redux';
import { setFilterContact } from '../../redux/filterSlice';
import { getContacts } from '../../redux/selectors';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  return (
    <>
      <section className={css.sectionWrapper}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm />
        <Section title="Contacts"></Section>
        <Filter filterByName={payload => dispatch(setFilterContact(payload))} />
        {contacts.length > 0 && <ContactsList />}
      </section>
      <ToastContainer />
    </>
  );
};

export default App;
