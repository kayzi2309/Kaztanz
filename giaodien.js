    function selectProduct(productName) {
      alert(`🛒 Đã chọn sản phẩm: ${productName}\n\n✅ Sản phẩm đã được thêm vào giỏ hàng!\n\n📞 Liên hệ: 0123.456.789 để đặt hàng`);
    }

    // Tab switching functionality
    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Filter products based on category (simulation)
        const category = this.textContent;
        console.log('Switched to category:', category);
      });
    });

    // Add hover effects
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Simulate real-time currency update
    setInterval(() => {
      const diamonds = document.querySelectorAll('.currency span')[1];
      const currentValue = parseInt(diamonds.textContent);
      diamonds.textContent = currentValue + Math.floor(Math.random() * 5);
    }, 5000);
    function selectProduct(name, price) {
  document.getElementById('invoice-product-name').textContent = name;
  document.getElementById('invoice-product-price').textContent = price + ' VNĐ';
  document.getElementById('invoice-modal').classList.remove('hidden');
}

function closeInvoice() {
  document.getElementById('invoice-modal').classList.add('hidden');
}

function confirmOrder() {
  const size = document.getElementById('size').value;
  if (!size) {
    alert("Vui lòng chọn size trước khi đặt hàng.");
    return;
  }
  alert("Đặt hàng thành công!\nSize: " + size);
  closeInvoice();
}
const products = [
            {
                id: 1,
                name: "Nike Air Max 270 - Phiên bản đặc biệt",
                category: "GIÀY THỂ THAO",
                price: 2500000,
                originalPrice: 3200000,
                image: "https://i.postimg.cc/tCT17FNN/OIP.jpg",
                badge: "HOT",
                discount: "-20%"
            },
            {
                id: 2,
                name: "Adidas Ultraboost 22 - Công nghệ mới nhất",
                category: "GIÀY CHẠY BỘ",
                price: 2800000,
                image: "https://i.postimg.cc/50fxFMLF/OIP-1.jpg",
                badge: "NEW"
            },
            {
                id: 3,
                name: "Gucci Leather Loafers - Sang trọng đẳng cấp",
                category: "GIÀY DA CAO CẤP",
                price: 15000000,
                image: "https://i.postimg.cc/fR4kTp2Y/920fd4d26a3438bbc1e2fc543852f309.jpg",
                badge: "VIP"
            },
            {
                id: 4,
                name: "Christian Louboutin Red Sole - Biểu tượng thời trang",
                category: "GIÀY CAO GÓT",
                price: 25000000,
                originalPrice: 30000000,
                image: "https://i.postimg.cc/7ZW4Z2Yd/OIP-2.jpg",
                badge: "VIP",
                discount: "-10%"
            },
            {
                id: 5,
                name: "Converse Chuck Taylor All Star - Classic",
                category: "GIÀY THỂ THAO",
                price: 1200000,
                image: "https://i.postimg.cc/Xvs29Tzz/b4799a8f363f351245ea3e0d532502f3.jpg",
                badge: "HOT"
            },
            {
                id: 6,
                name: "Vans Old Skool - Phong cách đường phố",
                category: "GIÀY THỂ THAO",
                price: 1500000,
                image: "https://i.postimg.cc/zDCgMnJJ/4a116d33456ac42d8c03306683879f4d.jpg",
                badge: "NEW"
            },
            {
                id: 7,
                name: "Balenciaga Triple S - Xu hướng thời thượng",
                category: "GIÀY THỂ THAO",
                price: 22000000,
                image: "https://i.postimg.cc/Xv4hfK7p/S62eb9723980c4a91a10d1f008350be4a-X.jpg",
                badge: "NEW"
            },
            {
                id: 8,
                name: "Birkenstock Arizona - Thoải mái tối đa",
                category: "GIÀY THỂ THAO",
                price: 3500000,
                image: "https://i.postimg.cc/8PFjGMGJ/OIP-3.jpg",
                badge: "NEW"
            }
        ];

        let selectedProduct = null;

        function formatPrice(price) {
            return new Intl.NumberFormat('vi-VN').format(price) + ' VNĐ';
        }

        function renderProducts() {
            const grid = document.getElementById('productsGrid');
            grid.innerHTML = products.map(product => `
                <div class="product-card" onclick="openInvoice(${product.id})">
                    <div style="position: relative;">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                        <div class="product-badge badge-${product.badge.toLowerCase()}">${product.badge}</div>
                        <div class="product-price">
                            ${formatPrice(product.price)}
                            ${product.discount ? `<div style="font-size: 0.8rem; color: #ff6b6b;">${product.discount}</div>` : ''}
                        </div>
                    </div>
                    <div class="product-info">
                        <div class="product-category">${product.category}</div>
                        <div class="product-name">${product.name}</div>
                        ${product.originalPrice ? `<div style="text-decoration: line-through; opacity: 0.7; font-size: 0.9rem;">Giá gốc: ${formatPrice(product.originalPrice)}</div>` : ''}
                    </div>
                </div>
            `).join('');
        }

        function openInvoice(productId) {
            selectedProduct = products.find(p => p.id === productId);
            
            document.getElementById('modalProductImage').src = selectedProduct.image;
            document.getElementById('modalProductName').textContent = selectedProduct.name;
            document.getElementById('modalProductCategory').textContent = selectedProduct.category;
            document.getElementById('modalProductPrice').textContent = formatPrice(selectedProduct.price);
            
            updateTotal();
            document.getElementById('invoiceModal').classList.add('show');
        }

        function closeModal() {
            document.getElementById('invoiceModal').classList.remove('show');
        }

        function updateTotal() {
            if (!selectedProduct) return;
            
            const quantity = parseInt(document.getElementById('quantitySelect').value);
            const size = document.getElementById('sizeSelect').value;
            const color = document.getElementById('colorSelect').value;
            
            const total = selectedProduct.price * quantity;
            document.getElementById('totalPrice').textContent = formatPrice(total);
            
            const transferContent = `TT ${selectedProduct.name.substring(0, 20)} Size${size} ${color} SL${quantity}`;
            document.getElementById('transferContent').textContent = transferContent;
            
            generateQRCode(total, transferContent);
        }

        function generateQRCode(amount, content) {
            const qrContainer = document.getElementById('qrCode');
            qrContainer.innerHTML = '';
            
            const bankInfo = {
                bank: 'VCB',
                account: '1234567890',
                amount: amount,
                description: content,
                template: 'compact'
            };
            
            const qrData = `https://img.vietqr.io/image/${bankInfo.bank}-${bankInfo.account}-${bankInfo.template}.png?amount=${bankInfo.amount}&addInfo=${encodeURIComponent(bankInfo.description)}`;
            
            const qrImg = document.createElement('img');
            qrImg.src = qrData;
            qrImg.style.width = '100%';
            qrImg.style.height = '100%';
            qrImg.style.borderRadius = '10px';
            qrContainer.appendChild(qrImg);
        }

        function confirmOrder() {
            const size = document.getElementById('sizeSelect').value;
            const color = document.getElementById('colorSelect').value;
            const quantity = document.getElementById('quantitySelect').value;
            const total = selectedProduct.price * quantity;
            
            alert(`🎉 Đặt hàng thành công!
            
📦 Sản phẩm: ${selectedProduct.name}
📏 Size: ${size}
🎨 Màu: ${color}
📊 Số lượng: ${quantity} đôi
💰 Tổng tiền: ${formatPrice(total)}

📱 Vui lòng thanh toán qua QR code và gửi ảnh chuyển khoản để xác nhận đơn hàng.
🚚 Đơn hàng sẽ được giao trong 2-3 ngày làm việc.

Cảm ơn bạn đã mua hàng tại Trọng Tấn Shoe Store! 👟✨`);
            
            closeModal();
        }

        // Initialize
        renderProducts();

        // Close modal when clicking outside
        document.getElementById('invoiceModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Nav tab functionality
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
