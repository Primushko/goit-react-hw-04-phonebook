import PropTypes from 'prop-types';
import css from './ContactList.module.css';
// Компонент ContactList зі списком контактів.
export const ContactList = ({ contacts, delContact }) => {
  return (
    <ul className={css.list}>
      {/* map по кожному контакту та повернення нового масиву з елементами списку */}
      {contacts.map(contact => {
        return (
          <li className={css.item} key={contact.id}>
            <span>{contact.name}:</span>
            <span className={css.number}>{contact.number}</span>
            <button
              className={css.button}
              type="button"
              // Виклик функції для видалення контакту
              onClick={() => {
                delContact(contact.id);
              }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  delContact: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
};
