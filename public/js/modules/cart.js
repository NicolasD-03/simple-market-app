const cart = document.querySelector(".market-content-items");

const addToCart = (carList, titleItem, img, price) => {

    const item = carList.find(x => x.title === titleItem);

    if (item){
        item.number += 1;
        return
    };
    carList.push({
        "title": titleItem,
        "img": img,
        "price": price,
        "number": 1
    });
};

const removeItemCart = (cartList, titleItem) => {
    const element = cartList.find(x => x.title === titleItem);
    cartList.splice(cartList.indexOf(element), 1)    
};

const updateNumberItemCart = (cartList, titleItem, number) => {
    const element = cartList.find(x => x.title === titleItem);
    element.number = number;
};

const clearCart = () => {
    const elem = document.querySelectorAll(".cart-item");
    elem.forEach((element) => {
        element.remove();
    });
    
};

const createItemCart = (cartList, cart) => {
    
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

export { createItemCart, clearCart, addToCart }