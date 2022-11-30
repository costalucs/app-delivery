import PropTypes from 'prop-types';

export default function Button({ datatestid, type, name, state, handle }) {
  return (
    <button
      data-testid={ datatestid }
      type={ type === 'submit' ? 'submit' : 'button' }
      disabled={ state }
      onClick={ handle }
    >
      {name}
    </button>
  );
}

Button.propTypes = {
  datatestid: PropTypes.string,
  NamedNodeMap: PropTypes.string,
  placeHolder: PropTypes.string,
  type: PropTypes.string,
  state: PropTypes.bool,
}.isRequired;
