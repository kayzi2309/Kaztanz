
  // Sort buttons
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Brand items
  document.querySelectorAll('.brand-item').forEach(item => {
    item.addEventListener('click', function() {
      document.querySelectorAll('.brand-item').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Filter chips
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  });

  // Add to cart
  document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const badge = document.querySelector('.cart-badge');
      badge.textContent = parseInt(badge.textContent) + 1;
      btn.textContent = '✅ Đã thêm!';
      btn.style.background = '#22c55e';
      setTimeout(() => {
        btn.textContent = '🛒 Thêm vào giỏ';
        btn.style.background = '';
      }, 1500);
    });
  });



const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');

let index = 0;
const total = images.length;

// Clone ảnh đầu
const firstClone = images[0].cloneNode(true);
slides.appendChild(firstClone);

function nextSlide() {
  index++;
  slides.style.transform = `translateX(-${index * 100}%)`;

  // Khi tới ảnh clone → reset mượt
  if (index === total) {
    setTimeout(() => {
      slides.style.transition = 'none';
      slides.style.transform = `translateX(0)`;
      index = 0;

      setTimeout(() => {
        slides.style.transition = 'transform 0.8s ease-in-out';
      }, 50);
    }, 800);
  }
}

setInterval(nextSlide, 4000);

