var btnRegister = document.querySelector(".login__account-btn");
var checkRegister = false;
showNoti(getProducts)

document.querySelector(".emailInput").onkeyup = function () {
    var check = emailValidation();
    var error = document.querySelector("#checkEmail");
    var emailInput = document.querySelector(".emailInput");
    if (check) {
        error.textContent = ''
        emailInput.style.border = '1px solid green'

    } else {
        error.textContent = 'Email không hợp lệ !'
        emailInput.style.border = '1px solid red'
    }
    if (error.value == '') {
        error.textContent = ''
        emailInput.style.border = '1px solid #ced4da'

    }
}

document.querySelector(".passInput").onkeyup = function () {
    var check = passValidation();
    var error = document.querySelector("#checkPass");
    var passInput = document.querySelector(".passInput");
    if (check) {
        error.textContent = ''
        passInput.style.border = '1px solid green'
        checkRegister = true;

    } else {
        error.textContent = 'Mật khẩu phải dài hơn 6 ký tự !'
        passInput.style.border = '1px solid red'
        checkRegister = false;
    }
    if (document.querySelector(".passInput").value == '') {
        error.textContent = ''
        passInput.style.border = '1px solid #ced4da'

    }
}

document.querySelector(".rePassInput").onkeyup = function () {
    var check = rePassValidation();
    var error = document.querySelector("#checkRePass");
    var rePassInput = document.querySelector(".rePassInput");
    if (check) {
        error.textContent = ''
        rePassInput.style.border = '1px solid green'
        checkRegister = true;

    } else {
        error.textContent = 'Mật khẩu nhập lại không khớp !'
        rePassInput.style.border = '1px solid red'
        checkRegister = false;
    }
    if (document.querySelector(".rePassInput").value == '') {
        error.textContent = ''
        rePassInput.style.border = '1px solid #ced4da'

    }
}


let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
function emailValidation() {
    var email = document.querySelector(".emailInput").value;
    if (regex.test(email)) {
        return true;
    }
    return false;
}

function passValidation() {
    var passInput = document.querySelector(".passInput");
    var passValue = passInput.value
    if (passValue.length < 6) {
        return false;
    } else {
        return true;
    }
}

function rePassValidation() {
    var rePassInput = document.querySelector(".rePassInput");
    var passValue = document.querySelector(".passInput").value;
    var rePassValue = rePassInput.value
    if (rePassValue === passValue) {
        return true;
    } else {
        return false;
    }
}

var btnRegister = document.querySelector(".btn-register");
btnRegister.onclick = function () {
    if (checkRegister) {
        alert("Đăng ký thành công !");
    } else {
        alert("Đã xảy ra lỗi !")
    }
}