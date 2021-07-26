const market = document.querySelector("#market");

import { addToCart } from "./cart.js";

const getItemsMarket = async () => {
    const response = await fetch("/api/v1/market/items");
    const result = await response.json();
    return result;
};

const postItemMarket = async (name, img, price, wheightPrice) => {
    const response = await fetch("/api/v1/market/items", {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: name, img: img, price: price, wheightPrice: wheightPrice})
    });
    const result = await response.json();
    showItemMarket(result);
}

const deleteItemMarket = async (id, item) => {
    const response = await fetch(`/api/v1/market/items/${ id }`, {
        method: 'DELETE'
    });
    const result = await response.json();
    if(!result){
        item.remove();
    }
    
}

const createItemMarket = (jsonMarket) => {

    const marketItem = document.createElement("div");
    marketItem.classList.add("market-item");
    marketItem.setAttribute("item-id", jsonMarket._id);

    // Market image
    const marketBlockImage = document.createElement("div");
    marketBlockImage.classList.add("market-item__image");

    const marketImage = document.createElement("img");
    marketImage.setAttribute("src",  "http://localhost:8080/assets/img/Apple-min.png");
    marketImage.setAttribute("alt", "Prout");

    marketBlockImage.appendChild(marketImage);

    // Market info
    const marketInfo = document.createElement("div");
    marketInfo.classList.add("market-item__info");

    // Market title
    const marketTitle = document.createElement("div");
    marketTitle.classList.add("info__title");
    marketTitle.innerText = jsonMarket.name;

    // Market wheight price
    const marketWheightPrice = document.createElement("div");
    marketWheightPrice.classList.add("info__wheight-price");
    marketWheightPrice.innerText = `${ jsonMarket.wheightPrice }$/lb`;

    // Market add button
    const marketAdd = document.createElement("div");
    marketAdd.classList.add("info__add");
    marketAdd.innerText = "Add";
    marketAdd.setAttribute("id", "add-cart");

    marketInfo.appendChild(marketTitle);
    marketInfo.appendChild(marketWheightPrice);
    marketInfo.appendChild(marketAdd);

    // Market item price
    const marketItemPrice = document.createElement("div");
    marketItemPrice.classList.add("market-item__price");
    marketItemPrice.innerText = `${ jsonMarket.price }$`

    const marketItemRemove = document.createElement("div");
    marketItemRemove.classList.add("market-item__remove");
    marketItemRemove.innerHTML = "&times;";

    marketItem.appendChild(marketBlockImage);
    marketItem.appendChild(marketInfo);
    marketItem.appendChild(marketItemPrice);
    marketItem.appendChild(marketItemRemove);
    
    // marketAdd.addEventListener('click', (e) =>{
    //     addToCart(cartList, title, "http://localhost:8080/assets/img/Chocolate-min.png", price)
    // });

    marketItemRemove.addEventListener('click', () => {
        const itemId = marketItem.getAttribute("item-id");
        deleteItemMarket(itemId, marketItem);
    });

    return marketItem

};

const showItemMarket = (jsonMarket) => {
    const itemMarket = createItemMarket(jsonMarket);
    market.appendChild(itemMarket);
    
};

export { getItemsMarket, postItemMarket, showItemMarket }