import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
// THÊM MỚI: Import file CSS cho bộ lọc (bạn sẽ tạo file này ở Bước 2)
import "./assets/css/filter.css"; 

const ListProducts_SP = () => {
  const [listProduct, setListProduct] = useState([]);
  const navigate = useNavigate();

  // THÊM MỚI: State cho các tính năng
  const [searchTerm, setSearchTerm] = useState(""); // 1. State cho ô tìm kiếm
  const [categories, setCategories] = useState([]); // 2. State chứa danh sách category
  const [selectedCategory, setSelectedCategory] = useState(""); // 3. State cho category được chọn
  const [sortBy, setSortBy] = useState("product_id-asc"); // 4. State cho sắp xếp

  // THÊM MỚI: Effect này chạy 1 LẦN DUY NHẤT để lấy danh sách category
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Lấy tất cả các giá trị trong cột 'category'
        const { data, error } = await supabase.from("products").select("category");
        if (error) throw error;

        // Lọc ra các giá trị duy nhất (unique)
        const uniqueCategories = [
          ...new Set(data.map((item) => item.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Lỗi khi lấy danh mục:", err.message);
      }
    };
    fetchCategories();
  }, []); // Mảng rỗng = chạy 1 lần khi component mount

  // SỬA ĐỔI: Effect này sẽ chạy lại MỖI KHI state tìm kiếm, lọc, sắp xếp thay đổi
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 1. Bắt đầu câu truy vấn
        let query = supabase.from("products").select("*");

        // 2. Thêm điều kiện TÌM KIẾM (Search) nếu có
        if (searchTerm) {
          // .ilike() = tìm kiếm case-insensitive (không phân biệt hoa/thường)
          query = query.ilike("title", `%${searchTerm}%`);
        }

        // 3. Thêm điều kiện LỌC (Filter) nếu có
        if (selectedCategory) {
          query = query.eq("category", selectedCategory);
        }

        // 4. Thêm SẮP XẾP (Sort)
        const [field, direction] = sortBy.split("-");
        query = query.order(field, { ascending: direction === "asc" });

        // 5. Thực thi câu truy vấn
        const { data, error } = await query;

        if (error) throw error;
        setListProduct(data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err.message);
      }
    };

    fetchProducts();
  }, [searchTerm, selectedCategory, sortBy]); // SỬA ĐỔI: Thêm dependencies

  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách sản phẩm</h2>

      {/* THÊM MỚI: Khối JSX cho các bộ lọc */}
      <div className="filters-container">
        {/* 1. Ô tìm kiếm */}
        <input
          type="text"
          placeholder="Tìm theo tên sản phẩm..."
          className="filter-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* 2. Hộp lọc Category */}
        <select
          className="filter-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">-- Lọc theo danh mục --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* 3. Hộp Sắp xếp */}
        <select
          className="filter-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="product_id-asc">Mặc định</option>
          <option value="price-asc">Giá: Thấp đến Cao</option>
          <option value="price-desc">Giá: Cao đến Thấp</option>
          <option value="rating_rate-desc">Đánh giá cao nhất</option>
          <option value="title-asc">Tên: A-Z</option>
        </select>
      </div>

      {/* Phần hiển thị danh sách sản phẩm (không đổi) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {listProduct.map((p) => (
          <div
            key={p.product_id}
            onClick={() => navigate(`/detail/${p.product_id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "12px",
              textAlign: "center",
              cursor: "pointer",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
            }}
          >
            <div
              style={{
                width: "100%",
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <img
                src={p.image}
                alt={p.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain", // Sửa từ "cover" -> "contain"
                }}
              />
            </div>

            <h4 style={{ margin: "10px 0 5px", fontSize: "1rem" }}>
              {p.title}
            </h4>
            <p style={{ color: "#e63946", fontWeight: "bold", margin: "0" }}>
              ${p.price}
            </p>
            <small style={{ color: "#555" }}>
              ⭐ {p.rating_rate} | ({p.rating_count} đánh giá)
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProducts_SP;