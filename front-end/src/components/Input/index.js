import PropTypes from 'prop-types';

export default function Input({
  datatestid, label, id, type, placeHolder, handle, name, value }) {
  return (
    <label htmlFor={ id }>
      {label}
      <input
        id={ id }
        data-testid={ datatestid }
        placeholder={ placeHolder }
        type={ type }
        onChange={ handle }
        name={ name }
        value={ value }
      />
    </label>
  );
}

Input.propTypes = {
  datatestid: PropTypes.string,
  label: PropTypes.string,
  placeHolder: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
}.isRequired;
