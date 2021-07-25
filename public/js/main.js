// Import
import { showModal, hideModal } from "./modules/modal.js";
import { createItemCart, clearCart } from "./modules/cart.js";
import { showItemMarket } from "./modules/market.js";

// Market modal
const marketModal = document.querySelector("#marketModal");
const closeMarketModal = document.querySelector("#marketModalClose");
const cartButton = document.querySelector("#cartButton");
// Admin Modal
const adminModal = document.querySelector("#adminModal");
const closeAdminModal = document.querySelector("#adminModalClose");
const adminButton = document.querySelector("#adminButton");
// Admin form
const formAdmin = document.querySelector(".admin-form form");
const titleInput = document.querySelector("#itemTitle");
const priceInput = document.querySelector("#itemPrice");
const priceWheightInput = document.querySelector("#itemPriceWheight");
// General
const market = document.querySelector("#market");
const cart = document.querySelector(".market-content-items");

let cartList = [
    {
        "title": "Banana",
        "img": "http://127.0.0.1:5500/public/assets/img/Banana-min.png",
        "price": 5,
        "number": 10
    },
    {
        "title": "Apple",
        "img": "http://127.0.0.1:5500/public/assets/img/Apple-min.png",
        "price": 2,
        "number": 50
    }
];

cartButton.addEventListener('click', () =>{
    showModal(marketModal);
    createItemCart(cartList, cart);
});

closeMarketModal.addEventListener('click', () =>{
    hideModal(marketModal);
    clearCart();
});

adminButton.addEventListener('click', () =>{
    showModal(adminModal);
});

closeAdminModal.addEventListener('click', () =>{
    hideModal(adminModal);
});

formAdmin.addEventListener('submit', (e) =>{
    e.preventDefault();
    showItemMarket(market, cartList, titleInput.value, priceWheightInput.value, priceInput.value);
    hideModal(adminModal);
    titleInput.value = ""; 
    priceWheightInput.value = ""; 
    priceInput.value = ""; 
});




