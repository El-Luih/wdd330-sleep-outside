import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource, containerElement) {
        this.container = containerElement;
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {}
    }

    renderProductDetails(product, container) {
        const details = `
        <h3>${product.Brand.Name}</h3>

        <h2 class="divider">${product.NameWithoutBrand}</h2>

        <img
          class="divider"
          src="${product.Image}"
          alt="${product.NameWithoutBrand}"
        />

        <p class="product-card__price">$${product.FinalPrice}</p>

        <p class="product__color">${product.Colors[0].ColorName}</p>

        <p class="product__description">${product.DescriptionHtmlSimple}</p>

        <div class="product-detail__add">
          <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div>
        `;
        container.innerHTML = details;
    }    

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails(this.product, this.container);
        document
            .getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart() {
      const cartItems = getLocalStorage("so-cart") || [];
      cartItems.push(this.product);
      setLocalStorage("so-cart", cartItems);
    }
}