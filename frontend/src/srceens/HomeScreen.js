import Rating from '../components/Rating';
import { getProducts } from '../api';
import { parseRequestUrl } from '../utils';

const HomeScreen = {
  render: async () => {
    const { value } = parseRequestUrl();
    const products = await getProducts({ });

    if (products.error) {
      return `<div class="error">${products.error}</div>`;
    }

    const categories = ['T-Shirt', 'Phone', 'Electronic', 'SmallKitchenAppliances'];
    const selectedCategory = value || ""; // Seçilen kategori değerini alın veya boş bir değer kullanın
    const searchedName = value || ""; // Seçilen kategori değerini alın veya boş bir değer kullanın

    const categoryOptions = categories
      .map(
        (category) => `
          <option value="${category}" ${category === selectedCategory ? 'selected' : ''}>${category}</option>
        `
      )
      .join('');

    // Seçilen kategoriye göre filtreleme yapın
    /*
    const filteredProducts = selectedCategory
      ? products.filter((product) => product.category === selectedCategory)
      : products;
      */

    
      const filteredProducts = selectedCategory
      ? products.filter((product) => {
        console.log("Product : ", product); // Konsola kategori değerini yazdırır
        console.log(product.category); // Konsola kategori değerini yazdırır
          return product.category.toLowerCase() === selectedCategory.toLowerCase();
        })
      : products;
        /*
      const searchedProducts = searchedName
      ? products.filter((product) => {
        //console.log("Product : ", product); // Konsola kategori değerini yazdırır
        console.log("product name : ", searchedName); // Konsola kategori değerini yazdırır
          return product.name.toLowerCase() === searchedName.toLowerCase();
        })
      : products;
      */
     /*
      const searched_name = document.getElementById('q').value;

      const searchedProducts = searched_name
      ? products.filter((product) => {
        //console.log("Product : ", product); // Konsola kategori değerini yazdırır
        //console.log("product.name :",product.name); // Konsola kategori değerini yazdırır
        console.log("product.value :",searched_name); // Konsola kategori değerini yazdırır
  
          return product.name.toLowerCase() === searched_name.toLowerCase();
        })     : products;
    
        console.log("products : ", searchedProducts);
        */


    console.log("selectedCategory : ", selectedCategory);

    return `

    <br>
      <div class="category-homescreen">
        <select class = "option-category" id="category" onchange="window.location.href = '/#/?q=' + this.value;">
          <option value="">All Categories</option>
          ${categoryOptions}
        </select>
      </div>

      <ul class="products">
        ${filteredProducts
          .map(
            (product) => `
              <li>
                <div class="product">
                  <a href="/#/product/${product._id}">
                    <img src="${product.image}" alt="${product.name}" />
                  </a>
                  <div class="product-name">
                    <a href="/#/product/${product._id}">${product.name}</a>
                  </div>
                  <div class="product-rating">
                    ${Rating.render({
                      value: product.rating,
                      text: `${product.numReviews} reviews`,
                    })}
                  </div>
                  <div class="product-brand">
                    ${product.brand}
                  </div>
                  <div class="product-price">
                    ${product.price} TL
                  </div>
                </div>
              </li>
            `
          )
          .join('\n')}
      </ul>
    `;
  },
  /*
  after_render: async () => {

    const products = await getProducts({ });
    //const searched_name = document.getElementById('q').value;

    document
      .getElementById('search-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchKeyword = document.getElementById('q').value;
        const filteredProducts = searchKeyword
        ? products.filter((product) => {
          console.log("product.value :",searchKeyword); // Konsola kategori değerini yazdırır

            return product.name.toLowerCase() === searchKeyword.toLowerCase();
          })
        : products;

          console.log("Product : ", filteredProducts); // Konsola kategori değerini yazdırır

      });



    

   
  },*/


};

export default HomeScreen;
