import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const listElement = document.querySelector(".product-list");
const tentsData = new ProductData("tents");
const tentsList = new ProductList("Tents", tentsData, listElement);

tentsList.init();
