import { User } from "../Models/userSignUp.js";

//lấy value từ input và kết nối API
document.querySelector("#submitBtn").onclick = function signUp(e) {
  e.preventDefault();
  let isValid = validation();
  if (!isValid) {
    return alert("Vui lòng nhập đầy đủ và chuẩn xác thông tin bên dưới nhé");
  } else {
    alert("Đăng ký thành công!");
  }
  let newUser = new User();
  let userArr = document.querySelectorAll("#frmSignUp input");

  for (let input of userArr) {
    let { id, value } = input;
    newUser[id] = value;
    let genderInp = document.querySelector(
      'input[name="gender"]:checked'
    ).value;
    if (genderInp === "true") {
      newUser.gender = "true";
    } else {
      newUser.gender = "false";
    }
  }
  console.log("new", newUser);

  let promise = axios({
    url: "https://shop.cyberlearn.vn/api/Users/signup",
    method: "POST",
    data: newUser,
  });
  promise.then(function (result) {
    console.log("data", result.data.content);
  });
  promise.catch(function (err) {
    return alert(err.response.data.message);
  });
  //   validation();
};

// validation

function validation() {
  let isValid = document.querySelector("#frmSignUp").checkValidity();
  if (!isValid) {
    let emailInp = document.querySelector("#email");
    let emailWarn = document.querySelector("#emailwarn");
    if (emailInp.validity.valueMissing) {
      emailWarn.innerHTML = "Địa chỉ email không thể để trống";
    }
    if (emailInp.validity.patternMismatch) {
      emailWarn.innerHTML = "Địa chỉ email sai định dạng";
    } else {
      emailWarn.innerHTML = "";
    }

    // kiểm tra tên
    let nameInp = document.querySelector("#name");
    let nameWarn = document.querySelector("#namewarn");
    if (nameInp.validity.valueMissing) {
      nameWarn.innerHTML = "Tên không thể để trống";
    }
    if (nameInp.validity.patternMismatch) {
      nameWarn.innerHTML = "Tên bạn sai định dạng mất rồi";
    } else {
      nameWarn.innerHTML = "";
    }

    // kiểm tra password
    let passwordInp = document.querySelector("#password");
    let pwWarn = document.querySelector("#pwwarn");
    if (passwordInp.validity.valueMissing) {
      pwWarn.innerHTML = "Hãy nhập password";
    }
    if (passwordInp.validity.patternMismatch) {
      pwWarn.innerHTML =
        "Password từ 8-20 ký tự, phải có 1 ký tự in hoa, 1 ký tự in thường, 1 số và 1 ký tự đặt biệt";
    } else {
      pwWarn.innerHTML = "";
    }
    // kiểm tra password confirm
    let confirmInp = document.querySelector("#confirm__password");
    let warnConfirm = document.querySelector("#warn__confirm");
    if (confirmInp.validity.valueMissing) {
      warnConfirm.innerHTML = "Hãy xác nhận lại password";
    }
    if (confirmInp.value !== passwordInp.value) {
      warnConfirm.innerHTML = "Mật khẩu đã nhập không trùng nhau";
    } else {
      warnConfirm.innerHTML = "";
    }

    //kiểm tra sdt
    let phoneInp = document.querySelector("#phone");
    let phoneWarn = document.querySelector("#phonewarn");
    if (phoneInp.validity.valueMissing) {
      phoneWarn.innerHTML = "Hãy nhập số điện thoại";
    }
    if (phoneInp.validity.patternMismatch) {
      phoneWarn.innerHTML = "Số điện thoại không đúng định dạng";
    } else {
      phoneWarn.innerHTML = "";
    }
  }
  return isValid;
}

// show password
document.querySelector(".show1").onclick = function showPassword() {
  let pw = document.querySelector("#password");
  if (pw.type === "password") {
    pw.type = "text";
  } else {
    pw.type = "password";
  }
};
//show password confirm
document.querySelector(".show2").onclick = function showPassword() {
  let pw = document.querySelector("#confirm__password");
  if (pw.type === "password") {
    pw.type = "text";
  } else {
    pw.type = "password";
  }
};
