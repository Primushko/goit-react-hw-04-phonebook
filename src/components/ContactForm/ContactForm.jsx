import React, { useState } from 'react';
import css from './ContactForm.module.css';
import PropTypes from 'prop-types';

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  const onChangeInput = evt => {
    const { name, value } = evt.currentTarget;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    addContact({ name, number });
    resetForm();
  };

  return (
    <>
      <form className={css.formstyle} onSubmit={handleSubmit}>
        <label htmlFor="nameInput" className={css.label}>
          Name
          <br />
          <input
            id="nameInput"
            className={css.input}
            onChange={onChangeInput}
            value={name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$"
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
            onChange={onChangeInput}
            value={number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
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
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

// import { Component } from 'react';
// import css from './ContactForm.module.css';
// import PropTypes from 'prop-types';

// export class ContactForm extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   resetForm = () => {
//     this.setState({ name: '', number: '' });
//   };

//   onChangeInput = evt => {

//     const { name, value } = evt.currentTarget;

//     this.setState({ [name]: value });
//   };

//   render() {
//     return (
//       <>
//         <form
//           className={css.formstyle}

//           onSubmit={evt => {

//             evt.preventDefault();

//             this.props.addContact(this.state);
//             this.resetForm();
//           }}
//         >
//           <label htmlFor="nameInput" className={css.label}>
//             Name
//             <br />
//             <input
//               id="nameInput"
//               className={css.input}
//               onChange={this.onChangeInput}
//               value={this.state.name}
//               type="text"
//               name="name"
//               pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$"
//               title="Name may contain only letters, apostrophe, dash and spaces. For exampleAdrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//               required
//               autoComplete="on"
//             />
//           </label>
//           <br />
//           <label htmlFor="numberInput">
//             Number
//             <br />
//             <input
//               id="numberInput"
//               className={css.input}
//               onChange={this.onChangeInput}
//               value={this.state.number}
//               type="tel"
//               name="number"
//               pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
//               title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//               required
//               autoComplete="on"
//             />
//           </label>
//           <br />
//           <button className={css.button} type="submit">
//             Add contact
//           </button>
//         </form>
//       </>
//     );
//   }
// }

// ContactForm.propTypes = {
//   addContact: PropTypes.func.isRequired,
// };
