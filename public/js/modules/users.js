import { showInfo } from "./info.js"; 

const form = document.querySelector(".user-form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#passwordConfirm");
const submit = document.querySelector("#submit");

const userLoginRegister = () => {
    if(submit){
        submit.addEventListener('click', (e) => {
            e.preventDefault();
            const formType = e.target.getAttribute('formtype');
            if(formType === "login"){
                fetch("http://localhost:8080/api/v1/users/login",{
                    method: 'POST',
                    credentials: 'include',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        email: email.value,
                        password: password.value
                    })
                })
                .then((res) => { return res.json() })
                .then((json) => {  
                    if(json.type && json.message){
                        if(json.type === "success"){
                            window.location = "http://localhost:8080/";
                        }
                        if(form.lastChild){
                            form.lastChild.remove();
                        };
                        showInfo(json.type, json.message, form)
                    };
                })
                .catch((err) => { console.log(err) });
            };
            if(formType === "register"){
                fetch("http://localhost:8080/api/v1/users/register", {
                    method: 'POST',
                    credentials: 'include',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        username: username.value,
                        email: email.value,
                        password: password.value,
                        passwordConfirm: passwordConfirm.value
                        })
                    })
                    .then((res) => { return res.json() })
                    .then((json) => {
                        console.log(json) 
                        if(json.type && json.message){
                            if(form.lastChild){
                                form.lastChild.remove();
                            };
                        showInfo(json.type, json.message, form)
                        };
                    })
                    .catch((err) => { console.error(err) })
                };
        });
    };
};


export { userLoginRegister };