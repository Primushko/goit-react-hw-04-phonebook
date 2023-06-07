import { Component } from 'react';
import { nanoid } from 'nanoid'; // генерація ідентифікаторів
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css'; // стилізація

const CONTACTS = `contacts`; // ключ LOCALSTORAGE
// масив контактів
const initialContacts = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  // метод componentDidMount викликається один раз після того, як компонент був змонтований
  componentDidMount() {
    // отримуємо дані з LOCALSTORAGE
    const savedContacts = localStorage.getItem(CONTACTS);
    // при наявності контактів - парсимо і записуємо в стейт
    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      this.setState({ contacts: parsedContacts });
    } else {
      // якщо немає - записуємо початковий масив
      this.setState({ contacts: initialContacts });
    }
  }
  // Метод componentDidUpdate викликається після оновлення стейту.
  componentDidUpdate(_, prevState) {
    // при зміні контактів-записуємо їх в LOCALSTORAGE
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(CONTACTS, JSON.stringify(this.state.contacts)); // перетворюємо масив в JSON
    }
  }
  // якщо міняється поле вводу, метод отримує name та value і записує їх в стейт
  onChangeInput = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value }); // встановлюється новий стан компонента
  };
  // додає новий контакт у список контактів
  addContact = ({ name, number }) => {
    // перевірка наявності такого контакту у списку
    if (
      this.state.contacts.some(
        value => value.name.toLocaleLowerCase() === name.toLocaleLowerCase()
      )
    ) {
      // якщо контакт існує, то показується повідомлення
      alert(`${name} is already in contacts`);
    } else {
      // додавання нового контакту до списку контактів
      this.setState(oldState => {
        const list = [...oldState.contacts]; // копія контактів старого стану
        list.push({
          id: nanoid(),
          name: name,
          number: number,
        });
        return { contacts: list }; // повертаємо новий стан
      });
    }
  };
  // фільтрація списку контактів за введеним користувачем рядком пошуку
  filter = () => {
    const { contacts, filter } = this.state; // деструктуризація
    // новий масив, який містить всі контакти, що містять рядок пошуку
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return filteredContacts;
  };
  // отримання параметру id, який потрібно видалити зі списку контактів
  delContact = id => {
    // отримання поточного списку контактів зі стану компонента
    const { contacts } = this.state;
    // Новий масив, який містить всі контакти, крім того, що має ідентифікатор
    const filtred = contacts.filter(item => item.id !== id);
    this.setState({ contacts: filtred }); // встановлення нового стану компонента
  };

  render() {
    return (
      <div className={css.conteiner}>
        <h1>Phonebook</h1>
        {/* передача пропсів в компоненти */}
        <ContactForm addContact={this.addContact} />
        <h2>Contacts</h2>
        {/* фільтр, який зберігається в стані + функція, яка оновлює значення фільтра */}
        <Filter filter={this.state.filter} onChangeInput={this.onChangeInput} />
        {/* функція для видалення контакту + масив контактів, який фільтрується залежно від значення фільтра */}
        <ContactList delContact={this.delContact} contacts={this.filter()} />
      </div>
    );
  }
}
