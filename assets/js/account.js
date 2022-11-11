var btnRegister = document.querySelector(".login__account-btn");

btnRegister.onclick = function () {
    var check = formValidation();

    if (check) {
        alert("Đăng ký thành công !");
    }
}