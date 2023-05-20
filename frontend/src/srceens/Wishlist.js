/* eslint-disable no-use-before-define */

import { parseRequestUrl, rerender } from '../utils';
import { getProduct } from '../api';
import { getWishlistItems, setWishlistItems } from '../localStorage';

const addToWishlist= (item, forceUpdate = false) => {
  let cartItems = getWishlistItems();
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
  setWishlistItems(cartItems);
  if (forceUpdate) {
    rerender(Wishlist);
  }
};
const removeFromWishlist= (id) => {
    setWishlistItems(getWishlistItems().filter((x) => x.product !== id));
  if (id === parseRequestUrl().id) {
    document.location.hash = '/wishlist';
  } else {
    rerender(Wishlist);
  }
};

const Wishlist = {
  after_render: () => {
    const qtySelects = document.getElementsByClassName('qty-select');
    Array.from(qtySelects).forEach((qtySelect) => {
      qtySelect.addEventListener('change', (e) => {
        const item = getWishlistItems().find((x) => x.product === qtySelect.id);
        addToWishlist({ ...item, qty: Number(e.target.value) }, true);
      });
    });
    const deleteButtons = document.getElementsByClassName('delete-button');
    Array.from(deleteButtons).forEach((deleteButton) => {
      deleteButton.addEventListener('click', () => {
        removeFromWishlist(deleteButton.id);
      });
    });
    document.getElementById('checkout-button').addEventListener('click', () => {
      document.location.hash = '/signin';
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
      const product = await getProduct(request.id);
      addToWishlist({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      });
    }
    const cartItems = getWishlistItems();
    return `
    <div class="content cart">
      <div class="cart-list">
        <ul class="cart-list-container">
          <li>
            <h3>Wishlist</h3>
            <div>Price</div>
          </li>
          ${
            cartItems.length === 0
              ? '<div>Wishlist is empty. <a href="/#/">Go Shopping</a>'
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
                $${item.price}
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

export default Wishlist;
