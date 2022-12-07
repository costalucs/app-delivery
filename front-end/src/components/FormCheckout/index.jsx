import React, { useEffect, useState } from 'react';
import { useSession } from '../../context/Auth.context';

function FormCheckout() {
  const session = useSession();
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    session.sellers(session.token).then((data) => {
      console.log(data);
      setSellers([...data]);
    });
  }, []);

  return (
    <form action="">
      <label htmlFor="seller-select">
        Seller
        <select
          id="seller-select"
          data-testid="customer_checkout__select-seller"
        >
          {sellers && sellers.map(({ id, name }) => (
            <option key={ id } value={ id }>
              {name}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="address-input">
        Vendedor
        <input
          type="text"
          id="address-input"
          name="deliveryAddress"
          data-testid="customer_checkout__input-address"
        />
      </label>
      <label htmlFor="number-input">
        Número
        <input
          type="number"
          id="number-input"
          name="deliveryNumber"
          data-testid="customer_checkout__input-address-number"
        />
      </label>
      <button
        type="submit"
        data-testid="customer_checkout__button-submit-order"
      >
        FINALIZAR PEDIDO
      </button>
    </form>
  );
}

export default FormCheckout;
