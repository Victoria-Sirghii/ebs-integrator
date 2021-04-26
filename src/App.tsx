import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ProductsTable from './components/ProductsTable';
import Cart from './components/Cart';
import { FaShoppingCart } from 'react-icons/fa';
import './Style.scss';

interface Product {
  id: number;
  name: string;
  category: Category;
  price: number;
}

interface Category {
  id: string;
  name: string;
}

interface Cart {
  product: {
    id: number;
    name: string;
    category: Category;
    price: number;
  };
  quantity: number;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart[]>([]);

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:3001/api/products/');
    const data = await response.json();
    setProducts(data);
  };

  const addToCart = (product: { id: number; name: string; category: Category; price: number }) => {
    //pun conditia in cazul in care utilizatorul doreste sa adauge produsul de mai multe ori in Cart, atunci se va aduna doar cantitatea
    if (cart.length !== 0) {
      let newList = [...cart];
      for (let i = 0; i < newList.length; i++) {
        if (newList[i].product.id === product.id) {
          newList[i].quantity = newList[i].quantity + 1;
          setCart(newList);
          break;
        } else {
          setCart([...cart, { product, quantity: 1 }]);
        }
      }
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      return prevCart.filter((item) => item.product.id !== id);
    });
    if (cart.length === 0) {
      setCart([]);
    }
  };

  const increaseQuantity = (id: number) => {
    let newList = [...cart];
    newList.forEach((item) => {
      if (item.product.id === id) {
        item.quantity = item.quantity + 1;
      }
    });
    setCart(newList);
  };

  const decreaseQuantity = (id: number) => {
    let newList = [...cart];
    newList.forEach((item) => {
      if (item.product.id === id && item.quantity > 1) {
        item.quantity = item.quantity - 1;
      }
    });
    setCart(newList);
  };

  const saveLocalCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  const getLocalCart = () => {
    if (localStorage.getItem('cart') === null) {
      localStorage.setItem('cart', JSON.stringify([]));
    } else {
      let cartLocal = JSON.parse(localStorage.getItem('cart') || '{}');
      setCart(cartLocal);
    }
  };

  useEffect(() => {
    fetchProducts();
    getLocalCart();
  }, []);

  useEffect(() => {
    saveLocalCart();
  }, [cart]);

  return (
    <Router>
      <div className="cartIcon">
        <Link to="/cart" className="cart">
          <FaShoppingCart />
          <span>{cart.reduce((sum, { quantity }) => sum + quantity, 0)}</span>
        </Link>
      </div>
      <Switch>
        <Route exact path="/">
          <ProductsTable
            products={products}
            setProducts={setProducts}
            onAddToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </Route>
        <Route path="/cart">
          <Cart
            cart={cart}
            removeFromCart={removeFromCart}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
