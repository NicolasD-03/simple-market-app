const showInfo = (type, message, parent) => {
    const messageBlock = document.createElement("div");
    messageBlock.classList.add("infoMessage");
    switch (type) {
        case "error":
            messageBlock.classList.add("error");
            messageBlock.innerText = `Error: ${ message }`
            parent.appendChild(messageBlock);
            break;
        case "success":
            messageBlock.classList.add("success");
            messageBlock.innerText = `Success: ${ message }`
            parent.appendChild(messageBlock);
            break;
        default:
            break;
    };
};

export { showInfo };