import { toast } from 'react-toastify';
import css from './ContactsList.module.css';
import cssButton from '../ContactForm/ContactForm.module.css';
import cssText from 'components/ContactsList/ContactsList.module.css';

import { useDispatch, useSelector } from 'react-redux';
import {
  getContacts,
  getFilter,
  getVisibleContacts,
} from '../../redux/selectors';
import { deleteContact } from '../../redux/contactsSlice';

export default function ContactsList() {
  const dispatch = useDispatch();

  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const visibleContacts = getVisibleContacts(contacts, filter.filter);

  const onDelete = contactId => {
    toast.success('Contact is deleted', {
      fontSize: '16px',
      width: '350px',
    });
    dispatch(deleteContact(contactId));
  };

  return (
    <ul className={css.contactsListContainer}>
      {visibleContacts.length ? (
        visibleContacts.map(contact => {
          return (
            <li className={css.contactsItem} key={contact.id}>
              <span className={css.text}>
                {contact.name}: {contact.number}
              </span>
              <button
                className={cssButton.deleteButton}
                type="button"
                onClick={() => {
                  onDelete(contact.id);
                }}
              >
                Delete
              </button>
            </li>
          );
        })
      ) : (
        <span className={cssText.text}>
          There is no contact in your phonebook. Add your first!
        </span>
      )}
    </ul>
  );
}
