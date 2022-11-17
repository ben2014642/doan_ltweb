const products = [
  { id: 1, name: 'Royal Canin Maxi 5+', price: 22, img: 'assets/img/product/1.png' },
  { id: 2, name: 'Wet Cat Food', price: 46, img: 'assets/img/product/2.png' },
  { id: 3, name: 'Dry Dog Food', price: 15, img: 'assets/img/product/3.png' },
  { id: 4, name: 'Royal Canin Exigent Cats', price: 23, img: 'assets/img/product/4.png' },
  { id: 5, name: 'Rocco Classic', price: 25, img: 'assets/img/product/5.png' },
  { id: 6, name: 'Veterinary Diet Canine', price: 22, img: 'assets/img/product/6.png' },
  { id: 7, name: 'Wilderness Dry Dog Food', price: 43, img: 'assets/img/product/7.png' },
  { id: 8, name: 'Wellbeloved Dry Dog Food', price: 61, img: 'assets/img/product/8.png' },
]

var queryDict = [];

// Stackoverflow
location.search.substr(1).split("&").forEach(item => {
  let a = item.split("=")[1];
  queryDict.push(a);
})

let idProduct = queryDict[0] ? queryDict[0] : 1;
//them id product da chon vao localstorage
window.localStorage.setItem('currentIdProduct', idProduct);
window.localStorage.setItem('totalProduct', 0);

var imgProduct = document.querySelector(".product-info__img");
var nameProduct = document.querySelector(".product-info__intro-title");
var priceProduct = document.querySelector(".product-info__intro-price");

imgProduct.src = products[idProduct - 1].img;
nameProduct.textContent = products[idProduct - 1].name;
priceProduct.textContent = '$' + products[idProduct - 1].price + '.00';

//add product to cart

document.querySelector(".product-info__add").onclick = function () {
  var myCart = [];
  var quantity = document.querySelector(".product-info__quantity-number").textContent;
  var selected = getProductCurrent(idProduct);
  if (window.localStorage.getItem('myCart')) {
    var getProducts = JSON.parse(window.localStorage.getItem('myCart'));
    let newItem = true;
    for (let index = 0; index < getProducts.length; index++) {
      const item = getProducts[index];
      console.log(item);
      if (item.id == idProduct) {
        console.log('1');
        getProducts[index] = {
          id: idProduct,
          name: item.name,
          quantity: item.quantity + parseInt(quantity),
          price: item.price,
          img: item.img
        };
        newItem = false;
      }
      if (index == getProducts.length - 1 && newItem) {
        getProducts.push({
          id: idProduct,
          name: selected.name,
          quantity: 1,
          price: selected.price,
          img: selected.img
        });
        break;
      }
    }
    myCart = getProducts;
  }
  else {
    let product = {
      id: idProduct,
      name: products[idProduct - 1].name,
      quantity: 1,
      price: products[idProduct - 1].price,
      img: products[idProduct - 1].img,
    }
    myCart.push(product);
  }
  window.localStorage.setItem('myCart', JSON.stringify(myCart));
  showNoti(myCart);
  alert("Thêm sản phẩm thành công !")
}

// tang giam so luong san pham

document.querySelector(".increase").onclick = function () {
  var quantity = document.querySelector(".product-info__quantity-number");
  quantity.textContent = parseInt(quantity.textContent) + 1;
}

document.querySelector(".decrease").onclick = function () {
  var quantity = document.querySelector(".product-info__quantity-number");
  var quantityCur = parseInt(quantity.textContent) - 1;
  if (quantityCur < 1) {
    quantity.textContent = 1;
  } else {
    quantity.textContent = quantityCur;
  }
}

// lấy sản phẩm đang được chọn
function getProductCurrent(idProduct) {
  return {
    id: idProduct,
    name: products[idProduct - 1].name,
    img: products[idProduct - 1].img,
    price: products[idProduct - 1].price
  }
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
// hiển thị số lượng đã thêm
function showNoti(myCart) {
  let n = getToTalProduct(myCart);
  document.querySelector(".total-cart__number").textContent = n;
}


window.onload = function () {
  myCart = JSON.parse(window.localStorage.getItem('myCart'))
  if (myCart) {
    showNoti(myCart);
  }
}


