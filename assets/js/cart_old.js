var getProducts = JSON.parse(window.localStorage.getItem('myCart')) ?? [];
var containCart = document.querySelector(".contain-cart"); //select thẻ tbody
var increases = document.querySelectorAll(".increase");
var decreases = document.querySelectorAll(".decrease");
var paymentBtn = document.querySelector(".paymentBtn");

let data = '';
var totalPrice = 0;

if (getProducts.length >= 1) {
    getProducts.forEach(pr => {
        let totalOneProduct = pr.price * pr.quantity // lấy tổng giá của một sản phẩm
        totalPrice += totalOneProduct; // tính tổng tiền cần phải thanh toán
        data += `
        <tr>
            <td colspan="2" id="test">
                <div class="cart">
                    <img src="${pr.img}" alt="" class="cart-info__img">
                    <h3 class="cart-info__name">${pr.name}</h3>
    
                </div>
            </td>
            <td class="cart-line-2">
                <p class="cart-price-label mgl-8" >Price: </p>
                <span class="cart-price-value" >$${pr.price}.00</span>
                <div class="product-info__quantity product-info__quantity-m">
                    <span class="product-info__quantity-number number-${pr.id}">${pr.quantity}</span>
                    <div class="product-info__volume">
                        <i id="${pr.id}" class="fa-solid fa-caret-up increase increase-up-${pr.id}"></i>
                        <i id="${pr.id}"class="fa-solid fa-caret-down decrease decrease-down-${pr.id}"></i>
                    </div>  
                </div>
            </td>
            <td>
                <div class="product-info__quantity">
                    <span class="product-info__quantity-number number-${pr.id}">${pr.quantity}</span>
                    <div class="product-info__volume">
                        <i id="${pr.id}" class="fa-solid fa-caret-up increase increase-up-${pr.id}"></i>
                        <i id="${pr.id}"class="fa-solid fa-caret-down decrease decrease-down-${pr.id}"></i>
                    </div>  
                </div>
            </td>
            <td class="cart-total-wrap">
                <p class="cart-price-label mgl-8" >Total: </p>
                <span class="cart-total-m" >$${totalOneProduct}.00</span>
                <i onclick="deleteProductInCart(${pr.id})" class="fa-solid fa-trash btnDelete-m"></i>
            </td>
            <td class="btnDelete" onclick="deleteProductInCart(${pr.id})"><i class="fa-solid fa-trash"></i></td>
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
    // boxTotal.style.display = 'none';
}

containCart.innerHTML = data

function updateCart(idProduct, status) {
    let index = 0;
    getProducts.forEach(pr => {
        const item = getProducts[index];
        if (pr.id == idProduct) {
            // nếu người dùng tăng số lượng sản phẩm
            if (status == 'add') {
                quantity = item.quantity += 1;
            } else {
                // nếu người dùng giảm số lượng sản phẩm
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


// nút tăng giảm số lượng sản phẩm


increases.forEach(item => {
    item.onclick = function (e) {
        console.log('123');
        var quantityBox = document.querySelector(".number-" + item.id); //lấy ra thẻ chứa số lượng tương ứng
        quantity = parseInt(quantityBox.textContent);
        if (quantity < 1) {
            quantityBox.textContent = 1;
        } else {
            quantityBox.textContent = quantity + 1;
        }
        updateCart(item.id, 'add');

        window.location.reload();

    }
})

decreases.forEach(item => {
    item.onclick = function () {
        console.log('456');
        var quantityBox = document.querySelector(".number-" + item.id);
        quantity = parseInt(quantityBox.textContent);
        if (quantity < 1) {
            quantityBox.textContent = 1;
        } else {
            quantityBox.textContent = quantity - 1;
        }
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

function deleteProductInCart(idProduct) {
    var check = confirm("Bạn có chắc chắn muốn xóa ?");
    if (!check) {
        return;
    }
    index = getProducts.findIndex(pr => {
        id = parseInt(pr.id);
        return id == idProduct;
    })
    getProducts.splice(index, 1);
    window.localStorage.setItem("myCart", JSON.stringify(getProducts));
    window.location.reload();
}

paymentBtn.onclick = function () {
    if (getProducts.length < 1) {
        alert("Không tồn tại đơn hàng nào !");
        return;
    }
    check = confirm("Bạn có chắc chắn đặt hàng ?")
    if (!check) {
        return;
    }

    window.localStorage.setItem("myCart",JSON.stringify([]));
    alert("Đặt hàng thành công !");
    
}

