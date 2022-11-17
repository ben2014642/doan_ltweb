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
    let isShow = inputSearch.classList.contains("showSearch");
    if (isShow) {
        console.log('if');
        inputSearch.classList.add('endSearch');
        inputSearch.classList.remove('showSearch');
        inputSearch.addEventListener("animationend", function () {
            if (isShow) {
                inputSearch.style.display = 'none';
                btnSearch.classList.replace("fa-xmark", "fa-magnifying-glass");

            }
            isShow = false;
        });
    } else {
        inputSearch.classList.add('showSearch');
        inputSearch.classList.remove('endSearch');
        inputSearch.style.display = 'block';
        btnSearch.classList.replace("fa-magnifying-glass", "fa-xmark");
        isShow = true;
    }
}

