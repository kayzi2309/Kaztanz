document.addEventListener("DOMContentLoaded", function () {

  // ===== TAB LOGIN / REGISTER =====
  const btnLogin = document.getElementById("btnLogin");
  const btnRegister = document.getElementById("btnRegister");

  const formLogin = document.getElementById("formLogin");
  const formRegister = document.getElementById("formRegister");

  btnLogin.onclick = function () {
  formLogin.classList.remove("hidden");
  formRegister.classList.add("hidden");

  btnLogin.classList.add("active");
  btnRegister.classList.remove("active");
};

btnRegister.onclick = function () {
  formRegister.classList.remove("hidden");
  formLogin.classList.add("hidden");

  btnRegister.classList.add("active");
  btnLogin.classList.remove("active");
};


  // ================= LOGIN =================
  formLogin.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(formLogin);
    const data = Object.fromEntries(formData);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);

    if (result.success) {
      localStorage.setItem("user", data.username); // LƯU USER
      window.location.href = "index.html";
    }
  });


  // ================= REGISTER =================
  formRegister.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(formRegister);
    const data = Object.fromEntries(formData);

    if (data.password !== data.confirmPassword) {
      alert("Mật khẩu nhập lại không khớp");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        password: data.password
      })
    });

    const result = await res.json();
    alert(result.message);

    if (result.success) {
      formRegister.reset();
      btnLogin.click();
    }
  });

});