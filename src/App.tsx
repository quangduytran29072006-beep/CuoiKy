import "./styles.css";
//@ts-ignore
import Home from "./Home";
//@ts-ignore
import Layout from "./Layout";
//@ts-ignore
import Trang1 from "./Trang1";
// @ts-ignore
import Trang2 from "./Trang2";
// @ts-ignore
import ListProduct from "./ListProduct.js";

// @ts-ignore
import ListProducts_SP from "./ListProducts_SP.js";

//@ts-ignore
import Chitietsanpham from "./Chitietsanpham";

//@ts-ignore
import ProductDetail from "./ProductDetail";

import { BrowserRouter, Routes, Route } from "react-router-dom";

//@ts-ignore
import LoginPage from "./LoginPage";
//@ts-ignore
import LogoutPage from "./LogoutPage";
//@ts-ignore
import ProtectedRoute from "./ProtectedRoute";
//@ts-ignore
import ListProducts_SP_Admin from "./ListProducts_SP_Admin";
//@ts-ignore
import EditProduct from "./EditProduct"; // Import này đã có, rất tốt

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Layout chung cho toàn bộ hệ thống */}
        <Route path="/" element={<Layout />}>
          {/* Trang chính */}
          <Route index element={<ListProducts_SP />} />
          
          <Route path="trang1" element={<Trang1 />} />
          <Route path="trang2" element={<Trang2 />} />
          <Route path="sanpham/:id" element={<Chitietsanpham />} />
          <Route path="detail/:id" element={<ProductDetail />} />

          {/* ✅ Trang đăng nhập & đăng xuất */}
          <Route path="login" element={<LoginPage />} />
          <Route path="logout" element={<LogoutPage />} />

          {/* ✅ Trang quản trị (Admin) */}
          <Route
            path="admin/products"
            element={
              <ProtectedRoute>
                <ListProducts_SP_Admin />
              </ProtectedRoute>
            }
          />
          
          {/* ----- SỬA LỖI NẰM Ở ĐÂY ----- */}
          {/* Chúng ta cần 2 route:
            1. Một route cụ thể cho "new" (phải đặt TRƯỚC :id)
            2. Một route động cho "sửa" (ví dụ: /admin/edit/123)
            (Đã bỏ dấu "/" ở đầu để nó lồng vào <Layout />)
          */}
          <Route path="admin/edit/new" element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          } />
          <Route path="admin/edit/:id" element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          } />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}