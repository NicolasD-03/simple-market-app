const showModal = (modal) => {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
};

const hideModal = (modal) => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
};

export {showModal, hideModal};