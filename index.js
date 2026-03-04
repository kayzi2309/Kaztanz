// ================= GLOBAL (ĐỂ NGOÀI DOMContentLoaded) =================

let currentProduct = null;

function openModal(id, name, price, image) {

    currentProduct = { id, name, price };

    document.getElementById("modal-name").innerText = name;
    document.getElementById("modal-price").innerText =
        Number(price).toLocaleString("vi-VN") + "đ";

    if (image) {
        document.getElementById("modal-image").src = image;
    }

    document.getElementById("overlay").style.display = "block";
    document.getElementById("productModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("productModal").style.display = "none";
}
function goToPhone() {
    window.location.href = "dienthoai.html";
}

function addToCart() {

    if (!currentProduct) return;

    const product = {
        ...currentProduct,
        color: document.getElementById("modal-color")?.value || "",
        storage: document.getElementById("modal-storage")?.value || "",
        battery: document.getElementById("modal-battery")?.value || "",
        condition: document.getElementById("modal-condition")?.value || "",
        quantity: 1
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Nếu đã có sản phẩm giống → tăng số lượng
    const existing = cart.find(p =>
        p.id === product.id &&
        p.color === product.color &&
        p.storage === product.storage &&
        p.battery === product.battery &&
        p.condition === product.condition
    );

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    closeModal();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);

    const badge = document.getElementById("cart-count");
    if (badge) badge.innerText = total;
}

// ================= DOM READY =================

document.addEventListener("DOMContentLoaded", function () {

    // ===== CAROUSEL + TAB =====
    const carouselElement = document.querySelector("#shoeCarousel");
    if (carouselElement) {
        const carousel = new bootstrap.Carousel(carouselElement);
        const tabs = document.querySelectorAll(".tab-item");

        tabs.forEach((tab, index) => {
            tab.addEventListener("click", function () {
                carousel.to(index);
                tabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
            });
        });

        carouselElement.addEventListener("slid.bs.carousel", function (event) {
            tabs.forEach(t => t.classList.remove("active"));
            tabs[event.to].classList.add("active");
        });
    }

    // ===== TRENDING TAG =====
    document.querySelectorAll('.trending-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            document.querySelectorAll('.trending-tag')
                .forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
        });
    });

    // ===== SIDEBAR =====
    document.querySelectorAll('.sidebar-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.sidebar-item')
                .forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // ===== LOAD PRODUCTS =====
    fetch("/api/products")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("products");
            if (!container) return;

            data.forEach(product => {

                container.innerHTML += `
                    <div class="product-card"
                         onclick="openModal(${product.id}, '${product.TenSanPham.replace(/'/g, "\\'")}', ${product.GiaMoi}, '${product.HinhAnh}')">

                        <div class="product-img">
                            <img src="${product.HinhAnh}" class="product-image">
                        </div>

                        <div class="product-name">
                            ${product.TenSanPham}
                        </div>

                        <div class="product-price">
                            ${Number(product.GiaMoi).toLocaleString("vi-VN")}đ
                        </div>

                        <div>⭐ ${product.DanhGia || 0}</div>
                    </div>
                `;
            });
        })
        .catch(err => console.error("Lỗi products:", err));

    // ===== LOAD FEATURED PRODUCTS =====
    fetch("/api/featuredProducts")
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("featuredProducts");
            if (!container) return;

            data.forEach(product => {

                container.innerHTML += `
                    <div class="product-card"
                         onclick="openModal(${product.id}, '${product.TenSanPham.replace(/'/g, "\\'")}', ${product.GiaMoi}, '${product.HinhAnh}')">

                        <div class="product-img">
                            <img src="${product.HinhAnh}" class="product-image">
                        </div>

                        <div class="product-name">
                            ${product.TenSanPham}
                        </div>

                        <div class="product-price">
                            ${Number(product.GiaMoi).toLocaleString("vi-VN")}đ
                        </div>

                        <div>⭐ ${product.DanhGia || 0}</div>
                    </div>
                `;
            });
        })
        .catch(err => console.error("Lỗi featured:", err));

    // ===== AUTH AREA =====
    const authArea = document.getElementById("authArea");
    const user = localStorage.getItem("user");

    if (user && authArea) {
        authArea.innerHTML = `
            <div class="header-action" style="cursor:pointer;">
                👤 ${user} | <span id="logoutBtn" style="color:red;">Đăng xuất</span>
            </div>
        `;

        document.getElementById("logoutBtn").onclick = function () {
            localStorage.removeItem("user");
            location.reload();
        };
    }
    updateCartCount();

    fetch("/api/danhmuc")
        .then(res => res.json())
        .then(data => {

    const sidebar = document.getElementById("sidebar-list");

    data.forEach(item => {

      const div = document.createElement("div");
      div.className = "sidebar-item";
      div.innerHTML = `
        <div class="sidebar-icon">🖱️</div>
        ${item.TenMatHang}
      `;

      div.onclick = () => {
        if (item.TenMatHang === "Điện thoại") {
        window.location.href = "dienthoai.html";
        }
      };

      sidebar.appendChild(div);
    });

  });

});

