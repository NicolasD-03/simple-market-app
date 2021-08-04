// Import
import { showModal, hideModal } from "./modules/modal.js";
import { createItemCart, clearCart } from "./modules/cart.js";
import { getItemsMarket, postItemMarket, showItemMarket } from "./modules/market.js";
import { userLoginRegister } from "./modules/users.js";
import { verifyToken, decodeToken } from "./modules/token.js";

// Market modal
const marketModal = document.querySelector("#marketModal");
const closeMarketModal = document.querySelector("#marketModalClose");
const cartButton = document.querySelector("#cartButton");
// Admin Modal
const closeAdminModal = document.querySelector("#adminModalClose");
const adminButton = document.querySelector("#adminButton");
const adminPost = document.querySelector(".admin-form form");

const menu = document.querySelector(".nav-menu");

const marketItems = await getItemsMarket();

const url = document.URL;

let userIsConnected = false;
let decodedToken = null;

const main = async () => {
    const token = await verifyToken();
    // Verify if token is valid
    if(token){
        userIsConnected = true;
        decodedToken = decodeToken(token);
    }else{
        userIsConnected = false;
    }
    if(userIsConnected){
        switch (url) {
            case "http://localhost:8080/pages/login.html":
                window.location = "http://localhost:8080/";
                break;
            case "http://localhost:8080/pages/register.html":
                window.location = "http://localhost:8080/";
                break;
            default:
                break;
        }
        if(decodedToken.user_admin){
            const adminButton = document.createElement("div");
            adminButton.classList.add("nav-menu_item");
            adminButton.setAttribute("id", "adminButton");
            adminButton.innerText = "Admin";

            menu.appendChild(adminButton)


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


        }
        const cartButton = document.createElement("div");
        cartButton.classList.add("nav-menu_item--image");
        cartButton.setAttribute("id", "cartButton");
        cartButton.innerHTML = `<svg><use xlink:href="#cart"></use></svg>`;

        menu.appendChild(cartButton);

        cartButton.addEventListener('click', () =>{
            showModal(marketModal);
            createItemCart();
        });

        closeMarketModal.addEventListener('click', () =>{
            hideModal(marketModal);
            clearCart();
        });

    }else{
        const registerButton = document.createElement("div");
        registerButton.classList.add("nav-menu_item");
        registerButton.innerHTML = `<a href="../pages/register.html">Register</a>`

        const loginButton = document.createElement("div");
        loginButton.classList.add("nav-menu_item");
        loginButton.innerHTML = `<a href="../pages/login.html">Login</a>`

        menu.appendChild(registerButton);
        menu.appendChild(loginButton);
    }

    marketItems.forEach(element => {
        showItemMarket(element);
    });
};

main();
userLoginRegister();



