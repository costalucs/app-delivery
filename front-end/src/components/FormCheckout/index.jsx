import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSession } from '../../context/Auth.context';
import { useCart } from '../../context/Cart.context';
import { useOrders } from '../../context/Orders.context';
import { createSale } from '../../helpers/api/sales';

function FormCheckout() {
  const session = useSession();
  const navigate = useHistory();
  const { cart, totalValue } = useCart();
  const { refresh } = useOrders();

  const [sellers, setSellers] = useState([]);
  const [formValues, setFormValues] = useState({
    sellerId: '',
    deliveryAddress: '',
    deliveryNumber: '',
  });

  useEffect(() => {
    session.sellers(session.token).then((data) => {
      setSellers([...data]);
    });
  }, []);

  function handleChange({ target }) {
    setFormValues((prev) => ({ ...prev, [target.name]: target.value }));
  }

  async function handleClick() {
    const dados = {
      sale: { ...formValues, totalPrice: totalValue },
      productsList: cart,
    };
    try {
      const { id } = await createSale(dados, session.token);
      await refresh();
      navigate.push(`/customer/orders/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form action="">
      <label htmlFor="seller-select">
        Vendedor
        <select
          id="seller-select"
          name="sellerId"
          data-testid="customer_checkout__select-seller"
          onChange={ handleChange }
        >
          <option disabled selected value> -- select an option -- </option>
          {sellers.map(({ id, name }) => (
            <option key={ id } value={ id }>
              {name}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="address-input">
        Endereço
        <input
          type="text"
          id="address-input"
          name="deliveryAddress"
          data-testid="customer_checkout__input-address"
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="number-input">
        Número
        <input
          type="number"
          id="number-input"
          name="deliveryNumber"
          data-testid="customer_checkout__input-address-number"
          onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        onClick={ handleClick }
        data-testid="customer_checkout__button-submit-order"
      >
        Finalizar Pedido
      </button>
    </form>
  );
}

export default FormCheckout;
