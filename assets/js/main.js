window.onload = function () {
  myCart = JSON.parse(window.localStorage.getItem('myCart'))
  console.log(myCart);
  if (myCart) {
    showNoti(myCart);
  }
}


document.querySelector(".rp-navbar").onclick = function () {
  console.log('1');
  let a = `
  <div class="menu-mobile">
    <div class="menu-mobile__list">
      
    </div>
  </div> `;
  document.body.style.position = "relative";
  document.body.insertAdjacentHTML("afterbegin",a);
}

window.onclick = function (e) {
  modal = document.querySelector(".menu-mobile");
  if (e.target == modal) {
    modal.style.display = "none";
  }
}