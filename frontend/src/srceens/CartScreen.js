/* eslint-disable no-use-before-define */
import {
  parseRequestUrl,
  showLoading,
  hideLoading,
  showMessage,
  rerender,
} from '../utils';
//import { parseRequestUrl, rerender } from '../utils';
import { getProduct, updateProduct, update, getUser } from '../api';
import { getCartItems, setCartItems,getUserInfo } from '../localStorage';

export const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    if (forceUpdate) {
      cartItems = cartItems.map((x) =>
        x.product === existItem.product ? item : x
      );
    }
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems(cartItems);
  if (forceUpdate) {
    rerender(CartScreen);
  }
};
export const removeFromCart = (id) => {
  setCartItems(getCartItems().filter((x) => x.product !== id));
  if (id === parseRequestUrl().id) {
    document.location.hash = '/cart';
  } else {
    rerender(CartScreen);
  }
};



const CartScreen = {
  after_render: () => {
    const request = parseRequestUrl();

    const qtySelects = document.getElementsByClassName('qty-select');
    Array.from(qtySelects).forEach((qtySelect) => {
      qtySelect.addEventListener('change', (e) => {
        const item = getCartItems().find((x) => x.product === qtySelect.id);
        addToCart({ ...item, qty: Number(e.target.value) }, true);
      });
    });
    const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener('click', async (e) => {
      
      console.log("deleteButton :", deleteButton.id);
      //const item = getProduct().find((x) => x.product === deleteButton.id);
      const product = await getProduct(deleteButton.id);

      console.log("item:", product);
      console.log("old stock :", product.countInStock);

      product.countInStock += 1;

      const data = await updateProduct({
        _id: request.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        category: product.category,
        countInStock: product.countInStock,
        description: product.description,
      });
      console.log("new stock :", product.countInStock);

      //updateProduct({});
      /*
      e.preventDefault();
      showLoading();
      const product = await getProduct(request.id);
      product.countInStock += 1;

      const data = await updateProduct({
        _id: request.id,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        category: product.category,
        countInStock: product.countInStock,
        description: product.description,
      });

      console.log("countInStock :", product.countInStock );
      hideLoading();
      */
      
      removeFromCart(deleteButton.id);
        /*
        console.log(deleteButton.id);
        const keys = Object.keys(localStorage);
      
        keys.forEach((key) => {
          const value = localStorage.getItem(key);
          if (value === 'undefined') {
            localStorage.removeItem(key);
            console.log(`Anahtar "${key}" başarıyla silindi.`);
          }
        });
        if (deleteButton.id === undefined) {
          localStorage.removeItem(undefined);  
        }*/
      });
    });
    
    document.getElementById('checkout-button').addEventListener('click', async (e) => {
      
      e.preventDefault();
      showLoading();

      const { name, email } = getUserInfo();
      //console.log("name : ", name);
      //const user = await getUser({ });
      const user = await getUser(request.id);
      //console.log("user : ", user.cash);
      const cartItems = getCartItems();
      console.log("user : ", user);
      console.log("user : ", name);

      if ( user.cash < cartItems.reduce((a, c) => a + c.price * c.qty, 0)) {
        //showMessage("Not Enough Money");
        console.log("Not Enough Money");

      }

      else {
        user.cash -= cartItems.reduce((a, c) => a + c.price * c.qty, 0);
        console.log(" product.price : ",  cartItems.reduce((a, c) => a + c.price * c.qty, 0));
        
      }
      const data = await update({
        _id: request.id,
        name : user.name,
        email : user.email,
        password : user.password,
        cash : user.cash,
      });
      console.log("New cash : ", user.cash);
      hideLoading();
      if (data.error) {
        showMessage(data.error);
      } else {
        document.location.hash = '/signin';

      }



      //document.location.hash = '/signin';
    });
  },
  render: async () => {
    /*
    const { name, email } = getUserInfo();
    console.log("name : ", name);
    console.log("name : ", email);
    */

    const request = parseRequestUrl();
    /*
    const user = await getUser(request.id);
    console.log("user cash: ", user.cash);
    console.log("user : ", user);
    */

    if (request.id) {
      const product = await getProduct(request.id);
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      });
    
    }
    const cartItems = getCartItems();
    return `
    <div class="content cart">
      <div class="cart-list">
        <ul class="cart-list-container">
          <li>
            <h3>Shopping Cart</h3>
            <div>Price</div>
          </li>
          ${
            cartItems.length === 0
              ? '<div>Cart is empty. <a href="/#/">Go Shopping</a>'
              : cartItems
                  .map(
                    (item) => `
            <li>
              <div class="cart-image">
                <img src="${item.image}" alt="${item.name}" />
              </div>
              <div class="cart-name">
                <div>
                  <a href="/#/product/${item.product}">
                    ${item.name}
                  </a>
                </div>
                <div>
                  Qty: 
                  <select class="qty-select" id="${item.product}">
                  ${[...Array(item.countInStock).keys()].map((x) =>
                    item.qty === x + 1
                      ? `<option selected value="${x + 1}">${x + 1}</option>`
                      : `<option  value="${x + 1}">${x + 1}</option>`
                  )}  

                  </select>
                  <button type="button" class="delete-button" id="${
                    item.product
                  }">
                    Delete
                  </button>
                </div>
              </div>
              <div class="cart-price">
                ${item.price} TL
              </div>
            </li>
            `
                  )
                  .join('\n')
          } 
        </ul>
      </div>
      <div class="cart-action">
          <h3>
            Subtotal (${cartItems.reduce((a, c) => a + c.qty, 0)} items)
            :
            $${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          </h3>
          <button id="checkout-button" class="primary fw">
            Proceed to Checkout
          </button>
      </div>
    </div>
    `;
  },
};

export default CartScreen;
