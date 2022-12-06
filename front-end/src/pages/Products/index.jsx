import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import { getProducts } from '../../helpers/api/products';

export default function Products() {
  const [items, setItems] = useState();

  useEffect(() => {
    getProducts().then((data) => setItems(data));
  }, []);

  return (
    <>
      <Header />
      <div>
        {items?.map((i, index) => <ProductCard key={ index } { ...i } />)}
      </div>

    </>
  );
}