import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);  // Thêm loading
  const [error, setError] = useState(null);  // Thêm error
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("products") 
          .select("*")
          .eq("product_id", id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm:", err.message);
        setError("Không thể tải thông tin sản phẩm. ID có thể không hợp lệ.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id && id !== "undefined") {  // Sửa: Thêm kiểm tra "undefined"
      fetchProduct();
    } else {
      setError("ID sản phẩm không hợp lệ.");
      setIsLoading(false);
    }
  }, [id]);

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <p>Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={() => navigate(-1)}>Quay lại</button>
      </div>
    );
  }

  // Giao diện (giữ nguyên)
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "30px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          padding: "8px 14px",
          borderRadius: "6px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Quay lại danh sách
      </button>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          alignItems: "flex-start",
        }}
      >
        {/* Hình ảnh sản phẩm */}
        <div
          style={{
            flex: "1 1 300px",
            maxWidth: "400px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Thông tin chi tiết */}
        <div style={{ flex: "1 1 300px" }}>
          <h2 style={{ marginBottom: "10px" }}>{product.title}</h2>
          <p
            style={{ fontSize: "1.2rem", color: "#e63946", fontWeight: "bold" }}
          >
            ${product.price}
          </p>

          <p style={{ marginTop: "10px", color: "#555" }}>
            ⭐ {product.rating_rate} ({product.rating_count} đánh giá)
          </p>

          <p
            style={{
              marginTop: "20px",
              lineHeight: "1.6",
              color: "#333",
              textAlign: "justify",
            }}
          >
            {product.description || "Chưa có mô tả cho sản phẩm này."}
          </p>

          <button
            style={{
              marginTop: "20px",
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              padding: "10px 16px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={() => alert("Đã thêm vào giỏ hàng!")}
          >
            🛒 Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;