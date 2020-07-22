function setTokenInLocalStorage(token) {
    if(token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
}

function getTokenFromLocalStorage() {
    let token = localStorage.getItem('token');
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp < Date.now() / 1000) {
            localStorage.removeItem('token');
            token = null;
        }
    }
    return token;
}

function getUserFromToken() {
    const token = getTokenFromLocalStorage();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

function removeTokenFromStorage() {
    localStorage.removeItem('token');
}

export default {
    setTokenInLocalStorage,
    getTokenFromLocalStorage,
    removeTokenFromStorage,
    getUserFromToken
};