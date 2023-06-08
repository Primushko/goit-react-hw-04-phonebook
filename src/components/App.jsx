// import { Component } from 'react';
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';

const CONTACTS = `contacts`;

const initialContacts = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem(CONTACTS);
    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      setContacts(parsedContacts);
    } else {
      setContacts(initialContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CONTACTS, JSON.stringify(contacts));
  }, [contacts]);

  const onChangeInput = evt => {
    const { value } = evt.currentTarget;
    setFilter(value);
  };

  const addContact = ({ name, number }) => {
    if (
      contacts.some(
        value => value.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      alert(`${name} is already in contacts`);
    } else {
      const newList = [
        ...contacts,
        {
          id: nanoid(),
          name: name,
          number: number,
        },
      ];
      setContacts(newList);
    }
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const delContact = id => {
    const filteredContacts = contacts.filter(item => item.id !== id);
    setContacts(filteredContacts);
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} onChangeInput={onChangeInput} />
      <ContactList delContact={delContact} contacts={filterContacts()} />
    </div>
  );
};

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const savedContacts = localStorage.getItem(CONTACTS);
//     if (savedContacts !== null) {
//       const parsedContacts = JSON.parse(savedContacts);
//       this.setState({ contacts: parsedContacts });
//     } else {
//       this.setState({ contacts: initialContacts });
//     }
//   }

//   componentDidUpdate(_, prevState) {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem(CONTACTS, JSON.stringify(this.state.contacts));
//     }
//   }

//   onChangeInput = evt => {
//     const { name, value } = evt.currentTarget;
//     this.setState({ [name]: value });
//   };

//   addContact = ({ name, number }) => {
//     if (
//       this.state.contacts.some(
//         value => value.name.toLocaleLowerCase() === name.toLocaleLowerCase()
//       )
//     ) {
//       alert(`${name} is already in contacts`);
//     } else {
//       this.setState(oldState => {
//         const list = [...oldState.contacts];
//         list.push({
//           id: nanoid(),
//           name: name,
//           number: number,
//         });
//         return { contacts: list };
//       });
//     }
//   };

//   filter = () => {
//     const { contacts, filter } = this.state;
//     const filteredContacts = contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//     return filteredContacts;
//   };

//   delContact = id => {
//     const { contacts } = this.state;
//     const filtred = contacts.filter(item => item.id !== id);
//     this.setState({ contacts: filtred });
//   };

//   render() {
//     return (
//       <div className={css.conteiner}>
//         <h1>Phonebook</h1>
//         <ContactForm addContact={this.addContact} />
//         <h2>Contacts</h2>
//         <Filter filter={this.state.filter} onChangeInput={this.onChangeInput} />
//         <ContactList delContact={this.delContact} contacts={this.filter()} />
//       </div>
//     );
//   }
// }
