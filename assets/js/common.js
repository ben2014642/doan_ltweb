var getProducts

if (window.localStorage.getItem('myCart')) {
    getProducts = JSON.parse(window.localStorage.getItem('myCart'));
} else {
    getProducts = [];
}

function showNoti(myCart) {
    let n = getToTalProduct(myCart);
    document.querySelector(".total-cart__number").textContent = n;
}

function getToTalProduct(myCart) {
    total = 0;
    myCart.forEach(cart => {
        total += cart.quantity;
        // console.log(cart);
    });
    // console.log(total);
    return total;

}

showNoti(getProducts);