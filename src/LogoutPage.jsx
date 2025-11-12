// Sửa ngày 4/11/2025 vì thêm trang Đăng xuất để xóa session người dùng
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Xóa thông tin user trong localStorage
    localStorage.removeItem("user");

    // 🕒 Hiển thị tạm thời thông báo rồi tự động chuyển hướng
    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gray-50">
      <div className="bg-white shadow-md rounded-2xl p-8 w-96 text-center border border-gray-200">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">
          👋 Đăng xuất thành công!
        </h2>
        <p className="text-gray-600 mb-2">
          Phiên đăng nhập của bạn đã được kết thúc.
        </p>
        <p className="text-gray-500 text-sm">
          Đang chuyển hướng đến trang đăng nhập...
        </p>
      </div>
    </div>
  );
};

export default LogoutPage;
