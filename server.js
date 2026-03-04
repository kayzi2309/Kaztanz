const express = require("express");
const sql = require("mssql");
const path = require("path");

const app = express();
// ================= API LẤY DANH MỤC SẢN PHẨM =================
app.get("/api/danhmuc", async (req, res) => {
  try {
    const result = await sql.query(`
      SELECT MaDanhMuc, TenMatHang 
      FROM dbo.DanhMuc
    `);

    res.json(result.recordset);

  } catch (err) {
    console.error("DANHMUC ERROR:", err);
    res.status(500).json({ error: "Lỗi server" });
  }
});
// ===== MIDDLEWARE =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ===== SQL CONFIG =====
const config = {
  user: "sa",
  password: "123456",
  server: "DESKTOP-NUBQHSG",
  database: "CuaHangDienThoai",
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

// ===== CONNECT SQL =====
sql.connect(config)
  .then(() => console.log("✅ Kết nối SQL Server thành công"))
  .catch(err => console.log("❌ Lỗi kết nối SQL:", err));


// ================= API LẤY SẢN PHẨM DÀNH CHO BẠN =================
app.get("/api/products", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM dbo.SanPhamChoBan");
    res.json(result.recordset);
  } catch (err) {
    console.log("PRODUCT ERROR:", err);
    res.status(500).json({ error: "Lỗi database" });
  }
});

// ================= API LẤY SẢN PHẨM NỔI BẬT =================
app.get("/api/featuredProducts", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM dbo.SanPhamNoiBat");
    res.json(result.recordset);
  } catch (err) {
    console.log("PRODUCT ERROR:", err);
    res.status(500).json({ error: "Lỗi database" });
  }
});


// ================= REGISTER =================
app.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({ success: false, message: "Nhập đầy đủ thông tin" });
    }

    // Kiểm tra trùng username
    const check = await sql.query`
      SELECT * FROM dbo.NguoiDung WHERE TenDangNhap = ${username}
    `;

    if (check.recordset.length > 0) {
      return res.json({ success: false, message: "Tên đăng nhập đã tồn tại" });
    }

    // Thêm user mới
    await sql.query`
      INSERT INTO dbo.NguoiDung (TenDangNhap, MatKhau)
      VALUES (${username}, ${password})
    `;

    res.json({ success: true, message: "Đăng ký thành công" });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});


// ================= LOGIN =================
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.json({ success: false, message: "Nhập đầy đủ thông tin" });
    }

    const result = await sql.query`
      SELECT * FROM dbo.NguoiDung
      WHERE TenDangNhap = ${username} AND MatKhau = ${password}
    `;

    if (result.recordset.length === 0) {
      return res.json({ success: false, message: "Sai tài khoản hoặc mật khẩu" });
    }

    res.json({ success: true, message: "Đăng nhập thành công" });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
});


// ===== START SERVER =====
app.listen(3000, () => {
  console.log("🚀 Server chạy tại http://localhost:3000");
});