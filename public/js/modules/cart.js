import { verifyToken, decodeToken } from "./token.js"
const cart = document.querySelector(".market-content-items");

const getToken =  async () => {
    return await verifyToken();
    
};

const updateNumberItemCart = async (userId, itemId, token, quantity) => {
    await fetch(`/api/v1/users/${ userId }/cart/${ itemId }`, {
        method: 'PATCH',
        headers: {"Content-Type": "application/json", "token": token },
        body: JSON.stringify({ quantity })
    });
};

const addToCart = async (itemId) => {
    const token = await getToken();
    if(!token){
        return
    }
    const decodedToken = decodeToken(token);

    const response = await fetch(`/api/v1/users/${ decodedToken.user_id }/cart`, {
        headers: {token}
    });
    const result = await response.json();

    const item = result.find(x => x.id === itemId);

    if(item){
        // Item exist in cart
        const quantity = item.quantity + 1;
        await updateNumberItemCart(decodedToken.user_id, itemId, token, quantity);


    }else{
        // Item doesn't exist in cart
        const response = await fetch(`/api/v1/users/${ decodedToken.user_id }/cart`, {
            method: 'POST', 
            headers: { "Content-Type": "application/json", token },
            body: JSON.stringify({id: itemId, quantity: 1})
        });
        const result = await response.json();
        console.log(result);
    }

};

const removeItemCart = async (userId, itemId, token) => {
    const response = await fetch(`/api/v1/users/${ userId }/cart/${ itemId }`, {
        method: 'DELETE',
        headers: {"token": token },
    });
};

const clearCart = () => {
    const elem = document.querySelectorAll(".cart-item");
    elem.forEach((element) => {
        element.remove();
    });
    
};

const createItemCart = async () => {

    const token = await getToken();
    const decodedToken = decodeToken(token);

    const userCart = await fetch(`/api/v1/users/${ decodedToken.user_id }/cart`, {
        headers: { "token": token }
    });
    const userCartResult = await userCart.json();

    for (let cartItem of userCartResult) {
        const marketItem = await fetch(`/api/v1/market/items/${ cartItem.id }`);
        const marketItemResult = await marketItem.json();
        if(!marketItemResult){
            break;
        }

    let itemQuantity = cartItem.quantity;

    const cartItemBlock = document.createElement("div");
    cartItemBlock.classList.add("cart-item");
    cartItemBlock.setAttribute("item-id", cartItem.id);

    // Cart image
    const cartBlockImage = document.createElement("div");
    cartBlockImage.classList.add("cart-item__image");

    const cartImage = document.createElement("img");
    cartImage.setAttribute("src",  marketItemResult.img);
    cartImage.setAttribute("alt", "Prout");

    cartBlockImage.appendChild(cartImage);

    // Cart info
    const cartInfo = document.createElement("div");
    cartInfo.classList.add("cart-item__info");

    // Cart title
    const cartTitle = document.createElement("div");
    cartTitle.classList.add("info__title");
    cartTitle.innerText = marketItemResult.name;

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
    cartItemNumber.innerText = itemQuantity;
    
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
    const price = marketItemResult.price * cartItem.quantity;
    cartItemPrice.innerText = `${ price }$`

    cartItemBlock.appendChild(cartBlockImage);
    cartItemBlock.appendChild(cartInfo);
    cartItemBlock.appendChild(cartItemPrice);

    cart.appendChild(cartItemBlock);

    cartButtonAdd.addEventListener('click', () => {
        cartItemNumber.innerText = itemQuantity+=1;
        updateNumberItemCart(decodedToken.user_id, cartItem.id, token,  itemQuantity);
        cartItemPrice.innerText = `${ itemQuantity*marketItemResult.price }$`;
    });

    cartButtonRemove.addEventListener('click', () => {
        if(itemQuantity === 1){
            cartItemBlock.remove();
            itemQuantity = 0;
            removeItemCart(decodedToken.user_id, cartItem.id, token);
            return
        }
        cartItemNumber.innerText = itemQuantity-=1;
        updateNumberItemCart(decodedToken.user_id, cartItem.id, token,  itemQuantity);
        cartItemPrice.innerText = `${ itemQuantity*marketItemResult.price }$`;
    });
    }

   

};

export { createItemCart, clearCart, addToCart }