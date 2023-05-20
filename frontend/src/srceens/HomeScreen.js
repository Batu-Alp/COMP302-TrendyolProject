import Rating from '../components/Rating';
import { getProducts } from '../api';
import { parseRequestUrl } from '../utils';

const HomeScreen = {
  render: async () => {
    const { value } = parseRequestUrl();
    const products = await getProducts({ searchKeyword: value });

    if (products.error) {
      return `<div class="error">${products.error}</div>`;
    }

    const categories = ['Tshirt', 'Phone', 'Electronic']; // Kategori seçenekleri
    const selectedCategory = value || ''; // Seçilen kategori değerini alın veya boş bir değer kullanın

    const categoryOptions = categories
      .map(
        (category) => `
          <option value="${category}">${category}</option>
        `
      )
      .join('');
    console.log("selectedCategory : " , selectedCategory);

    //const categoryname = document.getElementById('category').value;
    const filteredProducts = selectedCategory
    ? products.filter((product) => {
        console.log("p cat : ", product.category);
        return product.category.toLowerCase() === selectedCategory.toLowerCase();
      })
    : products;
  
    

    //console.log(categoryname);


    return `
      <div class="category-homescreen">
        <select id="category" onchange="window.location.href = '/#/?q=' + this.value;">
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
                    <a href="/#/product/1">${product.name}</a>
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
};

export default HomeScreen;
