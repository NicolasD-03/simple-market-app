// Import
import { showModal, hideModal } from "./modules/modal.js";
import { createItemCart, clearCart } from "./modules/cart.js";
import { getItemsMarket, postItemMarket, showItemMarket } from "./modules/market.js";

// Market modal
const marketModal = document.querySelector("#marketModal");
const closeMarketModal = document.querySelector("#marketModalClose");
const cartButton = document.querySelector("#cartButton");
// Admin Modal
const closeAdminModal = document.querySelector("#adminModalClose");
const adminButton = document.querySelector("#adminButton");

const adminPost = document.querySelector(".admin-form form");

const marketItems = await getItemsMarket();

let cartList = [
    {
        "title": "Banana",
        "img": "http://localhost:8080/assets/img/Banana-min.png",
        "price": 5,
        "number": 10
    },
    {
        "title": "Apple",
        "img": "http://localhost:8080/assets/img/Apple-min.png",
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

adminPost.addEventListener('submit', (e) =>{
    e.preventDefault();
    const { itemTitle,  itemPrice, itemPriceWheight} = e.target.elements;
    postItemMarket(itemTitle.value, "test", itemPrice.value, itemPriceWheight.value);
    hideModal(adminModal);
    itemTitle.value = ''; 
    itemPrice.value = ''; 
    itemPriceWheight.value = ''; 
});



marketItems.forEach(element => {
    showItemMarket(element);
});





