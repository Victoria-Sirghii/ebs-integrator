import React from 'react';
import { FaArrowDown, FaArrowUp, FaCartPlus, FaCartArrowDown } from 'react-icons/fa';
import '../Style.scss';

interface ProductsProps {
  products: {
    id: number;
    name: string;
    category: Category;
    price: number;
  }[];
  setProducts: any;
  onAddToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
}

interface Category {
  id: string;
  name: string;
}

const ProductsTable: React.FC<ProductsProps> = ({ products, onAddToCart, removeFromCart, setProducts }) => {
  let newList = [...products];

  const sortAscByCategory = () => {
    newList.sort((a, b) => (a.category.name > b.category.name ? 1 : -1));
    setProducts(newList);
  };

  const sortDesByCategory = () => {
    newList.sort((a, b) => (a.category.name > b.category.name ? -1 : 1));
    setProducts(newList);
  };

  const sortAscByPrice = () => {
    newList.sort((a, b) => a.price - b.price);
    setProducts(newList);
  };
  const sortDescByPrice = () => {
    newList.sort((a, b) => b.price - a.price);
    setProducts(newList);
  };

  return (
    <main className="container">
      <table>
        <thead>
          <tr>
            <th className="flex">
              <FaArrowUp onClick={sortDesByCategory} className="arrow" />
              Category
              <FaArrowDown onClick={sortAscByCategory} className="arrow" />
            </th>
            <th>Name</th>
            <th className="flex">
              <FaArrowUp onClick={sortDescByPrice} className="arrow" />
              Price
              <FaArrowDown onClick={sortAscByPrice} className="arrow" />
            </th>
            <th>Add to cart</th>
            <th>Remove from cart</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const { id, name, price, category } = product;
            return (
              <tr key={id}>
                <td>{category.name}</td>
                <td>{name}</td>
                <td>$ {price}</td>
                <td onClick={onAddToCart.bind(null, product)} className="align-center">
                  <FaCartPlus className="icon" />
                </td>
                <td onClick={removeFromCart.bind(null, id)} className="align-center">
                  <FaCartArrowDown className="icon" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};

export default ProductsTable;
