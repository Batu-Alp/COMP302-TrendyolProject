import { getUserInfo } from '../localStorage';
import { parseRequestUrl } from '../utils';
import { getProducts } from '../api';
import Rating from './Rating';



const Header = {
  render: () => {
    const { name, isAdmin, isSeller } = getUserInfo();
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
    <input type="text" name="q" id="q" value="${value || ''}" /> 
    <button type="submit"><i class="fa fa-search"></i></button>
  </form>        
  </div>
  <div>
  <i class="glyphicon glyphicon-user"></i>
  ${
    name
      ? `<a href="/#/profile">${name}</a>`
      : `
          <a href="/#/signin">Log-in</a>`
  }  

  ${name  && !isAdmin && !isSeller? `
  <i class="fa fa-shopping-cart" style="font-size:18px"></i>
  <a href="/#/cart">Cart</a>`
  : ''}

  ${name && !isAdmin && !isSeller ? `
  <i class="fa fa-heart" style="font-size:18px"></i>
  <a href="/#/wishlist">Wishlist</a>` 
  : ''}

  ${name  && !isAdmin && !isSeller? `<a href="/#/customer-support">Customer Support</a>` : ''}

  ${isAdmin ? `<a href="/#/dashboard">Dashboard</a>` : ''}
  ${isSeller ? `<a href="/#/dashboard">Dashboard</a>` : ''}


  </div>`;
  },
  after_render: async () => {

    const products = await getProducts({ });

    
    document
      .getElementById('search-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchKeyword = document.getElementById('q').value;

        document.location.hash = `/?q=${searchKeyword}`;

        /*
        const searchKeyword = document.getElementById('q').value;
        //document.location.hash = `/?q=${searchKeyword}`;
        const filteredProducts = searchKeyword
        ? products.filter((product) => {
          //console.log("Product : ", product); // Konsola kategori değerini yazdırır
          //console.log("product.name :",product.name); // Konsola kategori değerini yazdırır
          console.log("product.value :",searchKeyword); // Konsola kategori değerini yazdırır

            return product.name.toLowerCase() === searchKeyword.toLowerCase();
          })
        : products;*/

          //console.log("Product : ", filteredProducts); // Konsola kategori değerini yazdırır
          
      });


      /*
      const filteredProducts = searchKeyword
      ? products.filter((product) => {
        console.log("Product : ", product); // Konsola kategori değerini yazdırır
        console.log(product.category); // Konsola kategori değerini yazdırır
          return product.category.toLowerCase() === selectedCategory.toLowerCase();
        })
      : products;
      */

    document
      .getElementById('aside-open-button')
      .addEventListener('click', async () => {
        document.getElementById('aside-container').classList.add('open');
      });
  },
};
export default Header;
