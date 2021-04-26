import React from 'react';
import { Link } from 'react-router-dom';
import { FaCartArrowDown, FaMinus, FaPlus } from 'react-icons/fa';
import '../Style.scss';

interface ProductsCart {
  cart: {
    product: {
      id: number;
      name: string;
      category: Category;
      price: number;
    };
    quantity: number;
  }[];
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}

interface Category {
  id: string;
  name: string;
}

const Cart: React.FC<ProductsCart> = ({ cart, removeFromCart, increaseQuantity, decreaseQuantity }) => {
  if (cart.length === 0) {
    return (
      <div>
        <p className="empty-cart">Your cart is empty, go back to products and add some in the cart.</p>
        <button className="btn">
          <Link to="/">Back to products</Link>
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <table>
          <thead>
            <th>Category</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove</th>
          </thead>
          <tbody>
            {cart.map((item) => {
              const { id, name, category, price } = item.product;
              return (
                <tr key={id}>
                  <td>{category.name}</td>
                  <td>{name}</td>
                  <td className="align-center">
                    <FaMinus onClick={decreaseQuantity.bind(null, id)} className="quantity-btn" />
                    {item.quantity}
                    <FaPlus onClick={increaseQuantity.bind(null, id)} className="quantity-btn" />
                  </td>
                  <td>$ {price}</td>
                  <td onClick={removeFromCart.bind(null, id)} className="align-center">
                    <FaCartArrowDown className="icon" />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className="btn">
          <Link to="/">Back to products</Link>
        </button>
      </div>
    );
  }
};

export default Cart;
