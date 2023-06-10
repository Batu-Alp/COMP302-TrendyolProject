import { getUserInfo } from '../localStorage';
import { parseRequestUrl } from '../utils';

const Header = {
  render: () => {
    const { name, isAdmin } = getUserInfo();
    const { value } = parseRequestUrl();
    return ` 
  <div class="brand">
    <button id="aside-open-button">
      &#9776;
    </button>
    <a href="/#/">trendyol</a>
  </div>
  <div class="search">
  <form class="search-form"  id="search-form">
    <input type="text" placeholder = "Write the product, category or brand you are looking for" name="q" id="q" value="${value || ''}" /> 
    <button type="submit"><i class="fa fa-search"></i></button>
  </form>        
  </div>
  <div>
  <i class="glyphicon glyphicon-user"></i>
  ${
    name
      ? `<a href="/#/profile">${name}</a>`
      : `
          <a href="/#/signin">Sign-In</a>`
  }  
    <i class="fa fa-shopping-cart" style="font-size:18px"></i>
    <a href="/#/cart">Cart</a>
    
    <i class="fa fa-heart" style="font-size:18px"></i>
    <a href="/#/wishlist">Wishlist</a>

    ${isAdmin ? `<a href="/#/dashboard">Dashboard</a>` : ''}
  </div>`;
  },
  after_render: () => {
    document
      .getElementById('search-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchKeyword = document.getElementById('q').value;
        document.location.hash = `/?q=${searchKeyword}`;
      });

    document
      .getElementById('aside-open-button')
      .addEventListener('click', async () => {
        document.getElementById('aside-container').classList.add('open');
      });
  },
};
export default Header;
