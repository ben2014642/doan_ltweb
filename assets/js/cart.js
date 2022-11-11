var getProducts = JSON.parse(window.localStorage.getItem('myCart'));
var containCart = document.querySelector(".contain-cart");
var boxTotal = document.querySelector(".section-total");
let data = '';
var totalPrice = 0;
if (getProducts) {
    getProducts.forEach(pr => {
        let totalOneProduct = pr.price * pr.quantity
        totalPrice += totalOneProduct;
        data += `
        <tr>
            <td colspan="2">
                <div class="cart">
                    <img src="${pr.img}" alt="" class="cart-info__img">
                    <h3 class="cart-info__name">${pr.name}</h3>
    
                </div>
            </td>
            <td>$${pr.price}.00</td>
            <td>
                <div class="product-info__quantity">
                    <span class="product-info__quantity-number number-${pr.id}">${pr.quantity}</span>
                    <div class="product-info__volume">
                        <i id="${pr.id}" class="fa-solid fa-caret-up increase increase-up-${pr.id}"></i>
                        <i id="${pr.id}"class="fa-solid fa-caret-down decrease decrease-down-${pr.id}"></i>
                    </div>  
                </div>
            </td>
            <td>$${totalOneProduct}.00</td>
        </tr>
        `
    });
    document.querySelector(".section-total__amount").textContent = "$" + totalPrice + ".00";
} else {
    data = `
        <tr>
            <td colspan="5" class="no-product">There are no products available</td>
        </tr>
    `
    boxTotal.style.display = 'none';
}

containCart.innerHTML = data


function updateCart(idProduct,status) {
    // console.log(idProduct);
    let index = 0;
    getProducts.forEach(pr => {
        const item = getProducts[index];
        if (pr.id == idProduct) {
            if (status == 'add') {
                console.log('11111');
                quantity = item.quantity += 1;
            } else {
                console.log('21111');
                quantity = item.quantity -= 1;
            }
            if (quantity < 1) {
                quantity = 1;
            }
            getProducts[index] = {
                id: idProduct,
                name: item.name,
                quantity: quantity,
                price: item.price,
                img: item.img

            };
        }
        index++;
    })
    window.localStorage.setItem('myCart', JSON.stringify(getProducts));

}


var increases = document.querySelectorAll(".increase");
var decreases = document.querySelectorAll(".decrease");


increases.forEach(item => {
    item.onclick = function (e) {
        var quantityBox = document.querySelector(".number-" + item.id);
        // quantityBox.textContent = parseInt(quantity.textContent) + 1;
        quantity = parseInt(quantityBox.textContent);
        if (quantity < 1) {
            quantityBox.textContent = 1;
        } else {
            quantityBox.textContent = quantity + 1;
        }
        console.log(quantity);
        
        updateCart(item.id,'add');

        window.location.reload();

    }
})

decreases.forEach(item => {
    item.onclick = function () {
        var quantityBox = document.querySelector(".number-" + item.id);
        quantity = parseInt(quantityBox.textContent);

        console.log(quantity);
        if (quantity < 1) {
            quantityBox.textContent = 1;
        } else {
            quantityBox.textContent = quantity -1;
        }
        console.log(quantity);
        
        updateCart(item.id);

        window.location.reload();

    }
})

function getProductCurrent(idProduct) {
    return {
        id: idProduct,
        name: getProducts[idProduct - 1].name,
        img: getProducts[idProduct - 1].img,
        price: getProducts[idProduct - 1].price
    }
}

// showNoti(getProducts)