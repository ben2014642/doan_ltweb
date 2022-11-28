var getProducts = '';

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
    });
    return total;
}

showNoti(getProducts);


//Hiệu ứng scroll của header
$(window).on("scroll", function () {
    if ($(window).scrollTop() > 100) {
        $(".header").addClass("active showHeader");
    } else {
        $(".header").removeClass("active showHeader");

    }
});


var btnSearch = document.querySelector(".btn-search");
// tạo animation search button
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




// Event show navbar responsive
document.querySelector(".rp-navbar").onclick = function () {
    document.querySelector(".menu-mobile").style.display = "block";
    document.querySelector(".menu-mobile__content").classList.add("mobile-show")
}


// responsive navbar
window.onclick = function (e) {
    modal = document.querySelector(".menu-mobile");
    btnClose = document.querySelector(".close-modal > i");
    // console.log(e.target);
    if (e.target == modal || e.target == btnClose) {
        modal.style.display = "none";
    }
}


document.querySelector(".item-featured").onclick = function () {
    var dropmenuM = document.querySelector(".dropmenu-m");
    if (dropmenuM.classList.contains("show-item-nav")) {
        dropmenuM.classList.remove("show-item-nav");
    } else {
        dropmenuM.classList.add("show-item-nav")
    }
}