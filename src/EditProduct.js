import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./assets/css/quanlysp.css"; 

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isCreating = id === "new";

  const initialProductState = {
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
    rating_rate: 0,
    rating_count: 0,
  };

  const [product, setProduct] = useState(initialProductState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
        console.error("Lỗi khi tải sản phẩm (ID: " + id + "):", err.message);
        setError("Không thể tải sản phẩm. ID có thể không tồn tại hoặc không hợp lệ.");
        // [SỬA LỖI]: Thêm alert và redirect tự động nếu fetch thất bại
        alert("ID sản phẩm không hợp lệ hoặc không tồn tại. Quay lại danh sách.");
        navigate("/admin/products");
      } finally {
        setIsLoading(false);
      }
    };

    if (isCreating) {
      setProduct(initialProductState);
      setError(null);
    } else if (id && id !== "" && id !== "undefined") {
      fetchProduct();
    } else {
      // [SỬA LỖI]: Thêm alert và redirect nếu ID không hợp lệ ngay từ đầu
      console.warn("ID không hợp lệ từ URL:", id);  // Logging để debug
      alert("ID sản phẩm không hợp lệ. Quay lại danh sách.");
      navigate("/admin/products");
    }
    
  }, [id, isCreating, navigate]);  // Thêm navigate vào dependency

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: (name === 'price' || name === 'rating_rate' || name === 'rating_count')
              ? parseFloat(value) || 0 
              : value,
    }));
  };

  const validateForm = () => {
    if (!product.title.trim()) return "Tên sản phẩm không được để trống.";
    if (product.price <= 0) return "Giá phải lớn hơn 0.";
    if (product.image && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(product.image)) {
      return "Link hình ảnh phải là URL hợp lệ (jpg, png, gif, webp).";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!isCreating && !window.confirm("Bạn có chắc muốn cập nhật sản phẩm này?")) {
      return;
    }

    setIsLoading(true);
    try {
      let error;
      if (isCreating) {
        const { product_id, ...insertData } = product; 
        const { error: insertError } = await supabase
          .from("products")
          .insert([insertData]);
        error = insertError;
      } else {
        if (!id || id === "" || id === "undefined") {
          throw new Error("ID sản phẩm không hợp lệ, không thể cập nhật.");
        }
        const { product_id, ...updateData } = product;
        const { error: updateError } = await supabase
          .from("products")
          .update(updateData)
          .eq("product_id", id);
        error = updateError;
      }

      if (error) throw error; 

      alert(isCreating ? "Thêm sản phẩm thành công!" : "Cập nhật thành công!");
      navigate("/admin/products"); 

    } catch (err) {
      setError("Đã xảy ra lỗi: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="container"><h2>Đang xử lý...</h2></div>;
  }

  if (error) {
    return (
      <div className="container">
        <h2>Lỗi</h2>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={() => navigate("/admin/products")}>Quay lại danh sách</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>{isCreating ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}</h2>
      
      <form onSubmit={handleSubmit} className="form">
        <label>
          Tên sản phẩm (Title):
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Giá (Price):
          <input
            type="number"
            name="price"
            step="0.01"
            value={product.price}
            onChange={handleChange}
            required
            min="0.01"
          />
        </label>

        <label>
          Mô tả (Description):
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            rows="5"
            style={{ fontFamily: 'Arial', fontSize: '14px', padding: '8px' }}
          />
        </label>

        <label>
          Danh mục (Category):
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
          />
        </label>

        <label>
          Link hình ảnh (Image URL):
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
          {product.image && /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(product.image) && (
            <img 
              src={product.image} 
              alt="Preview" 
              className="thumb" 
              style={{ marginTop: '10px', maxWidth: '100px' }} 
            />
          )}
        </label>
        
        <div className="actions">
          <button
            type="button"
            className="btn gray"
            onClick={() => navigate("/admin/products")}
            disabled={isLoading}
          >
            Hủy
          </button>
          <button type="submit" className="btn green" disabled={isLoading}>
            {isLoading ? "Đang lưu..." : "Lưu lại"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
