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

$(window).on("scroll", function () {
    if ($(window).scrollTop() > 150) {
        $(".header").addClass("active showHeader");
    } else {
        $(".header").removeClass("active showHeader");

    }
});

var btnSearch = document.querySelector(".btn-search");
btnSearch.onclick = function (e) {
    var inputSearch = document.querySelector(".search");
    if (inputSearch.classList.contains('showSearch')) {
        inputSearch.classList.add('endSearch');
        inputSearch.classList.remove('showSearch');
        console.log(inputSearch.offsetWidth);
        inputSearch.addEventListener("animationend", function() {
            inputSearch.style.display = 'none';
            
        }, false);
    } else {
        console.log(inputSearch.offsetWidth);
        inputSearch.classList.add('showSearch');
        inputSearch.classList.remove('endSearch');
        inputSearch.style.display = 'block';
        

    }
}