const verifyToken = async  () => {
    if(!document.cookie){
        return false;
    }
    const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    .split('=')[1];
    if(!token){
        return false;
    }
    const response = await fetch("http://localhost:8080/api/v1/users/verify/token", {
        method: 'GET',
        headers: {"token": token}
    })
    const json = await response.json();
    if(json.type && json.type === "error"){
        return false;
    }
    return token;
};

const decodeToken = (token) => {
    try{
        return JSON.parse(atob(token.split('.')[1]));
    }catch(error){
        return null
    }
};

export { verifyToken, decodeToken };