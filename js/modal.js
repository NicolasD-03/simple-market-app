const marketModal = document.querySelector("#marketModal");
const closeMarketModal = document.querySelector("#marketModalClose");
const cartButton = document.querySelector("#cartButton");

const adminModal = document.querySelector("#adminModal");
const closeAdminModal = document.querySelector("#adminModalClose");
const adminButton = document.querySelector("#adminButton");

const body = document.querySelector('body');

cartButton.addEventListener('click', () =>{
    marketModal.style.display = "flex";
    body.style.overflow = "hidden";
});

closeMarketModal.addEventListener('click', () =>{
    marketModal.style.display = "none";
    body.style.overflow = "auto";
});


adminButton.addEventListener('click', () =>{
    adminModal.style.display = "flex";
    body.style.overflow = "hidden";
});

closeAdminModal.addEventListener('click', () =>{
    adminModal.style.display = "none";
    body.style.overflow = "auto";
});

