const container = document.getElementById("container");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

function showRegister() {
  loginForm.classList.remove("active");
  registerForm.classList.add("active");
}

function showLogin() {
  registerForm.classList.remove("active");
  loginForm.classList.add("active");
}

function loginUser() {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!username || !password) {
    alert("Vui lòng điền đầy đủ thông tin đăng nhập!");
    return;
  }

  if (username === "admin" && password === "123456") {
    alert("Đăng nhập thành công với tư cách quản trị viên!");
    window.location.href = "giaodien.html";
    return;
  }

  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const user = storedUsers.find(u => u.username === username && u.password === password);

  if (user) {
    alert("Đăng nhập thành công!");
    window.location.href = "giaodien.html";
  } else {
    alert("Sai tài khoản hoặc mật khẩu!");
  }
}

function registerUser() {
  const username = document.getElementById("register-username").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const email = document.getElementById("register-email").value.trim();

  if (!username || !password || !email) {
    alert("Vui lòng điền đầy đủ thông tin đăng ký!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some(u => u.username === username)) {
    alert("Tên tài khoản đã được sử dụng. Vui lòng chọn tên khác.");
    return;
  }

  users.push({ username, password, email });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Đăng ký thành công!");
  showLogin();
}
