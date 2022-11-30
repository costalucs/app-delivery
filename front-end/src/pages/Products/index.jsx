import { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { getProducts } from '../../helpers/api/getProducts';

export default function Products() {
  const [items, setItems] = useState();

  useEffect(() => {
    getProducts().then((data) => setItems(data));
  }, []);

  return (
    <div>
      {items?.map((i, index) => <ProductCard key={ index } { ...i } />)}
    </div>
  );
}
