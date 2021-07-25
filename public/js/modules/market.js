import { addToCart } from "./cart.js";

const createItemMarket = (cartList, title, priceWheight, price) => {

    const marketItem = document.createElement("div");
    marketItem.classList.add("market-item");

    // Market image
    const marketBlockImage = document.createElement("div");
    marketBlockImage.classList.add("market-item__image");

    const marketImage = document.createElement("img");
    marketImage.setAttribute("src",  "http://127.0.0.1:5500/public/assets/img/Apple-min.png");
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
        addToCart(cartList, title, "http://127.0.0.1:5500/public/assets/img/Chocolate-min.png", price)
    });

    return marketItem

};

const showItemMarket = (market, cartList, title, priceWheight, price) => {
    const itemMarket = createItemMarket(cartList, title, priceWheight, price);
    market.appendChild(itemMarket);
    
};

export { showItemMarket }