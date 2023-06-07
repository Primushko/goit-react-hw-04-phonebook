import css from './Filter.module.css';
import PropTypes from 'prop-types';
// Компонент Filter - для пошуку контактів за ім'ям.
export const Filter = ({ filter, onChangeInput }) => {
  // filter - містить введений текст фільтру.onChangeInput - функція, яка викликається при зміні значення фільтру.
  return (
    <>
      <label>
        Find contacts by name
        <br />
        <input
          className={css.input}
          onChange={onChangeInput} // виклик функції onChangeInput при зміні значення фільтру
          value={filter} // встановлення значення фільтру
          type="text"
          name="filter"
        />
      </label>
    </>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeInput: PropTypes.func.isRequired,
};
