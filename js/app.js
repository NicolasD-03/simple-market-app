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
const body = document.querySelector('body');

let cartList = [
    {
        "title": "Banana",
        "img": "/img/Banana-min.png",
        "price": 5,
        "number": 10
    },
    {
        "title": "Apple",
        "img": "/img/Apple-min.png",
        "price": 2,
        "number": 50
    }
];


const showModal = (modal, body) => {
    modal.style.display = "flex";
    body.style.overflow = "hidden";
};

const hideModal = (modal, body) => {
    modal.style.display = "none";
    body.style.overflow = "auto";
};

const addToCart = (cart, titleItem, img, price) => {

    const item = cart.find(x => x.title === titleItem);

    if (item){
        item.number += 1;
        return
    };
    cart.push({
        "title": titleItem,
        "img": img,
        "price": price,
        "number": 1
    });
};

const updateNumberItemCart = (cartList, titleItem, number) => {
    const element = cartList.find(x => x.title === titleItem);
    element.number = number;
};

const removeItemCart = (cartList, titleItem) => {
    const element = cartList.find(x => x.title === titleItem);
    cartList.splice(cartList.indexOf(element), 1)    
};

const createItemCart = (cartList) => {
    
    cartList.forEach((element) =>{
    let number = element.number;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    // Cart image
    const cartBlockImage = document.createElement("div");
    cartBlockImage.classList.add("cart-item__image");

    const cartImage = document.createElement("img");
    cartImage.setAttribute("src",  element.img);
    cartImage.setAttribute("alt", "Prout");

    cartBlockImage.appendChild(cartImage);

    // Cart info
    const cartInfo = document.createElement("div");
    cartInfo.classList.add("cart-item__info");

    // Cart title
    const cartTitle = document.createElement("div");
    cartTitle.classList.add("info__title");
    cartTitle.innerText = element.title;

    // Cart control
    const cartControl = document.createElement("div");
    cartControl.classList.add("info__control");

    // Cart remove button
    const cartButtonRemove = document.createElement("div");
    cartButtonRemove.classList.add("info__button");
    cartButtonRemove.innerText = "-"

    // Cart item number
    const cartItemNumber = document.createElement("div");
    cartItemNumber.classList.add("info__number");
    cartItemNumber.innerText = element.number;
    
    // Cart add button
    const cartButtonAdd = document.createElement("div");
    cartButtonAdd.classList.add("info__button");
    cartButtonAdd.innerText = "+";

    cartControl.appendChild(cartButtonRemove);
    cartControl.appendChild(cartItemNumber);
    cartControl.appendChild(cartButtonAdd);

    cartInfo.appendChild(cartTitle);
    cartInfo.appendChild(cartControl);

    // Cart item price
    const cartItemPrice = document.createElement("div");
    cartItemPrice.classList.add("cart-item__price");
    const price = element.price * element.number;
    cartItemPrice.innerText = `${ price }$`

    cartItem.appendChild(cartBlockImage);
    cartItem.appendChild(cartInfo);
    cartItem.appendChild(cartItemPrice);

    cart.appendChild(cartItem);

    cartButtonAdd.addEventListener('click', () => {
        cartItemNumber.innerText = number+=1;
        updateNumberItemCart(cartList, element.title, number);
        cartItemPrice.innerText = `${ number*element.price }$`;
    });

    cartButtonRemove.addEventListener('click', () => {
        if(number === 1){
            cartItem.remove();
            number = 0;
            removeItemCart(cartList, element.title);
            return
        }
        cartItemNumber.innerText = number-=1;
        cartItemPrice.innerText = `${ number*element.price }$`;
        updateNumberItemCart(cartList, element.title, number);
    });

    });
};

const clearCart = () => {
    const elem = document.querySelectorAll(".cart-item");
    elem.forEach((element) => {
        element.remove();
    });
    
};

const createItemMarket = (title, priceWheight, price) => {

    const marketItem = document.createElement("div");
    marketItem.classList.add("market-item");

    // Market image
    const marketBlockImage = document.createElement("div");
    marketBlockImage.classList.add("market-item__image");

    const marketImage = document.createElement("img");
    marketImage.setAttribute("src",  "/img/Apple-min.png");
    marketImage.setAttribute("alt", "Prout");

    marketBlockImage.appendChild(marketImage);

    // Market info
    const marketInfo = document.createElement("div");
    marketInfo.classList.add("market-item__info");

    // Market title
    const marketTitle = document.createElement("div");
    marketTitle.classList.add("info__title");
    marketTitle.innerText = title;

    // Market wheight price
    const marketWheightPrice = document.createElement("div");
    marketWheightPrice.classList.add("info__wheight-price");
    marketWheightPrice.innerText = `${ priceWheight }$/lb`;

    // Market add button
    const marketAdd = document.createElement("div");
    marketAdd.classList.add("info__add");
    marketAdd.innerText = "Add";

    marketInfo.appendChild(marketTitle);
    marketInfo.appendChild(marketWheightPrice);
    marketInfo.appendChild(marketAdd);

    // Market item price
    const marketItemPrice = document.createElement("div");
    marketItemPrice.classList.add("market-item__price");
    marketItemPrice.innerText = `${ price }$`

    marketItem.appendChild(marketBlockImage);
    marketItem.appendChild(marketInfo);
    marketItem.appendChild(marketItemPrice);
    
    marketAdd.addEventListener('click', (e) =>{
        addToCart(cartList, title, "/img/Chocolate-min.png", price)
    });

    return marketItem

};

const showItemMarket = (market) => {
    const title = titleInput.value;
    const priceWheight = priceWheightInput.value;
    const price = priceInput.value;
    const itemMarket = createItemMarket(title, priceWheight, price);
    market.appendChild(itemMarket);
    hideModal(adminModal, body);
};

// Modal show/hide
cartButton.addEventListener('click', () =>{
    showModal(marketModal, body);
    createItemCart(cartList);
});

closeMarketModal.addEventListener('click', () =>{
    hideModal(marketModal, body);
    clearCart();
});


adminButton.addEventListener('click', () =>{
    showModal(adminModal, body);
});

closeAdminModal.addEventListener('click', () =>{
    hideModal(adminModal, body);
});

formAdmin.addEventListener('submit', (e) =>{
    e.preventDefault();
    showItemMarket(market); 
});




