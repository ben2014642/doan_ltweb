window.onload = function () {
  myCart = JSON.parse(window.localStorage.getItem('myCart'))
  console.log(myCart);
  if (myCart) {
    showNoti(myCart);
  }
}


$(window).on("scroll", function () {
  if ($(window).scrollTop() > 50) {
    $(".header").addClass("active");
  } else {
    //remove the background property so it comes transparent again (defined in your css)
    $(".header").removeClass("active");
  }
});