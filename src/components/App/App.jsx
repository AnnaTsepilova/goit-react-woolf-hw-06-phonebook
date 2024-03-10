import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './App.module.css';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactsList from 'components/ContactsList/ContactsList';
import Section from 'components/Section/Section';
import Filter from 'components/Filter/Filter';

import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact } from '../../redux/contactsSlice';
import { setFilterContact } from '../../redux/filterSlice';
import { getContacts } from '../../redux/selectors';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const addContactApp = payload => {
    let isContactName = contacts.filter(contact =>
      contact.name.toLowerCase().includes(payload.name.toLowerCase())
    );
    let isContactNumber = contacts.filter(contact =>
      contact.number.toLowerCase().includes(payload.number.toLowerCase())
    );

    if (isContactName.length) {
      toast.warn(`Name ${payload.name} is already in your contacts`, {
        background: '#eebf31',
        fontSize: '16px',
        width: '350px',
      });
      return;
    }

    if (isContactNumber.length) {
      toast.warn(`Number ${payload.number} is already in your contacts`, {
        background: '#eebf31',
        fontSize: '16px',
        width: '350px',
      });
      return;
    }

    dispatch(addContact(payload));
  };

  const contactDeleteHandler = contactId => {
    toast.success('Contact is deleted', {
      fontSize: '16px',
      width: '350px',
    });
    dispatch(deleteContact(contactId));
  };

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <section className={css.sectionWrapper}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={payload => addContactApp(payload)} />
        <Section title="Contacts"></Section>
        <Filter filterByName={payload => dispatch(setFilterContact(payload))} />
        <ContactsList onDelete={payload => contactDeleteHandler(payload)} />
      </section>
      <ToastContainer />
    </>
  );
  // const [contacts, setContacts] = useState(() => {
  //   return (
  //     JSON.parse(window.localStorage.getItem('contacts')) || initialContacts
  //   );
  // });
  // const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   window.localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  // const formSubmitHandler = data => {
  //   const contact = { id: nanoid(), ...data };

  //   let isContactName = contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(data.name.toLowerCase())
  //   );

  //   if (isContactName.length) {
  //     toast.warn(`${data.name} is already in contacts`);
  //     return;
  //   }

  //   let isContactNumber = contacts.filter(contact =>
  //     contact.number.toLowerCase().includes(data.number.toLowerCase())
  //   );

  //   if (isContactNumber.length) {
  //     toast.warn(`${data.number} is already in contacts`);
  //     return;
  //   }

  //   setContacts(prevState => [...prevState, contact]);
  //   toast.success('Contact was added');
  // };

  // const handleFilter = value => {
  //   setFilter(value);
  // };

  // const getContacts = () => {
  //   let results = contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(filter.toLowerCase())
  //   );

  //   if (!results.length) {
  //     toast.warn('Contact wasn`t found');
  //   }
  //   return results;
  // };

  // const deleteContact = contactId => {
  //   setContacts(contacts.filter(contact => contact.id !== contactId));
  //   toast.success('Contact is deleted');
  // };

  // return (
  //   <section className={css.sectionWrapper}>
  //     <h1 className={css.title}>Phonebook</h1>
  //     <Section>
  //       <ContactForm onSubmit={formSubmitHandler} />
  //     </Section>
  //     <Section title="Contacts">
  //       <Filter filterByName={handleFilter} />
  //       {contacts.length ? (
  //         <ContactsList contacts={getContacts()} onDelete={deleteContact} />
  //       ) : (
  //         <span className={cssText.text}>
  //           There is no contact in your phonebook. Add your first!
  //         </span>
  //       )}
  //     </Section>
  //     <ToastContainer />
  //   </section>
  // );
};

export default App;
