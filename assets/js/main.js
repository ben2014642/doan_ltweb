window.onload = function () {
  myCart = JSON.parse(window.localStorage.getItem('myCart'))
  if (myCart) {
    showNoti(myCart);
  }
}