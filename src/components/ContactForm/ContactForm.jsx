import { Component } from 'react';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';
// компонент форми для додавання нового контакту
export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  // очищення полів форми
  resetForm = () => {
    this.setState({ name: '', number: '' });
  };
  // змінf значення полей вводу
  onChangeInput = evt => {
    // розпаковка значення name та value з об'єкту події
    const { name, value } = evt.currentTarget;
    // встановлення значення в стейт
    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        <form
          className={css.formstyle}
          // збереження даних форми в стейт
          onSubmit={evt => {
            // відміна перезавантаження сторінки
            evt.preventDefault();
            // додавання нового контакту в стейт
            this.props.addContact(this.state);
            this.resetForm();
          }}
        >
          <label htmlFor="nameInput" className={css.label}>
            Name
            <br />
            <input
              id="nameInput"
              className={css.input}
              onChange={this.onChangeInput} // метод для зміни значення полів вводу
              value={this.state.name} // встановлення поточного значення поля введення, яке зберігається в стані компоненту
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              autoComplete="on"
            />
          </label>
          <br />
          <label htmlFor="numberInput">
            Number
            <br />
            <input
              id="numberInput"
              className={css.input}
              onChange={this.onChangeInput}
              value={this.state.number}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              autoComplete="on"
            />
          </label>
          <br />
          <button className={css.button} type="submit">
            Add contact
          </button>
        </form>
      </>
    );
  }
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};
