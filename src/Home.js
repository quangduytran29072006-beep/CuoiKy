import React, { useState } from "react";

const Home = () => {
  const str = "K18, TRƯỜNG ĐẠI HỌC GIA ĐỊNH";

  // Biến thường
  const dssv = ["Nguyễn Văn An111", "Trần Văn Ba", "Nguyễn Văn Cường"];

  // Biến thường ds2
  const ds2 = [
    { id: "001", hoten: "Nguyễn Thị An111", lop: "K18", gioitinh: false },
    { id: "002", hoten: "Trần Văn Ba", lop: "K18", gioitinh: true },
    { id: "003", hoten: "Nguyễn Văn Cường", lop: "K18", gioitinh: true },
    { id: "007", hoten: "Nguyễn Văn Bảy", lop: "phicong", gioitinh: true },
  ];

  // State ds3
  const [ds3, setDs3] = useState([
    { id: "101", hoten: "Lê Thị Hoa", lop: "K19", gioitinh: false },
    { id: "102", hoten: "Phạm Văn Nam", lop: "K19", gioitinh: true },
    { id: "103", hoten: "Nguyễn Văn Bình", lop: "K19", gioitinh: false },
  ]);
  //ds3[2].hoten="jkldsjflk"

  // State cho ô nhập tên mới
  const [tenMoi, setTenMoi] = useState("");

  // Hàm cập nhật ds3 khi gõ trong ô input bảng ds3
  const handleChangeDs3 = (id, field, value) => {
    setDs3((prevDs3) =>
      prevDs3.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Hàm sửa họ tên ds3 bằng giá trị từ ô nhập tênMoi
  const TestSuaDLds3 = (id) => {
    if (!tenMoi.trim()) {
      alert("Vui lòng nhập tên mới trước khi sửa!");
      return;
    }
    setDs3((prevDs3) =>
      prevDs3.map((item) =>
        item.id === id ? { ...item, hoten: tenMoi } : item
      )
    );
    setTenMoi(""); // reset ô nhập sau khi cập nhật
  };

  //Viết lại
  const TestSuaDLds3_aaa = (id) => {
    if (!tenMoi.trim()) {
      alert("Vui lòng nhập tên mới trước khi sửa!");
      return;
    }
    var newds3 = ds3.map((phantu) => {
      if (phantu.id === id) {
        phantu.hoten = tenMoi;
      }

      return phantu;
    });
    setDs3(newds3);
  };

  // Nút sửa ds2 (biến thường)
  const TestSuaDLds2 = (id) => {
    ds2.map((item) => {
      if (item.id === id) {
        item.hoten = "Ronaldo";
        console.log("ds2 item.hoten = " + item.hoten);
      }
      return item;
    });
    alert("ds2 đã thay đổi nhưng UI không cập nhật tự động!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>{str}</h3>

      {/* Hiển thị danh sách từ biến thường dssv */}
      <div>
        <p>DANH SÁCH SINH VIÊN (biến thường dssv)</p>
        {dssv.map((sv, index) => (
          <p key={index}>{sv}</p>
        ))}
      </div>

      {/* Hiển thị bảng ds2 (biến thường) */}
      <div style={{ marginTop: "20px" }}>
        <p>DANH SÁCH SINH VIÊN ds2 (biến thường)</p>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <td>ID</td>
              <td>Họ tên</td>
              <td>Lớp</td>
              <td>Giới tính</td>
              <td>Sửa DL</td>
            </tr>
          </thead>
          <tbody>
            {ds2.map((sv) => (
              <tr key={sv.id}>
                <td>{sv.id}</td>
                <td>
                  <input type="text" value={sv.hoten} readOnly />
                </td>
                <td>{sv.lop}</td>
                <td>
                  <input type="checkbox" checked={sv.gioitinh} readOnly />
                </td>
                <td>
                  <input
                    type="button"
                    value="Sửa"
                    onClick={() => TestSuaDLds2(sv.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <small>
          Chú ý: Vì ds2 là biến thường, UI sẽ không cập nhật khi thay đổi giá
          trị.
        </small>
      </div>

      {/* Hiển thị bảng ds3 (state) */}
      <div style={{ marginTop: "30px" }}>
        <p>DANH SÁCH SINH VIÊN ds3 (state)</p>

        {/* Ô nhập tên mới */}
        <div style={{ marginBottom: "10px" }}>
          <label>Nhập tên mới: </label>
          <input
            type="text"
            value={tenMoi}
            onChange={(e) => setTenMoi(e.target.value)}
            placeholder="Nhập tên muốn đổi..."
          />
        </div>

        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <td>ID</td>
              <td>Họ tên</td>
              <td>Lớp</td>
              <td>Giới tính</td>
              <td>Sửa DL</td>
            </tr>
          </thead>
          <tbody>
            {ds3.map((sv) => (
              <tr key={sv.id}>
                <td>{sv.id}</td>
                <td>
                  <input
                    type="text"
                    value={sv.hoten}
                    onChange={(e) =>
                      handleChangeDs3(sv.id, "hoten", e.target.value)
                    }
                  />
                </td>
                <td>{sv.lop}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={sv.gioitinh}
                    onChange={(e) =>
                      handleChangeDs3(sv.id, "gioitinh", e.target.checked)
                    }
                  />
                </td>
                <td>
                  <input
                    type="button"
                    value="Sửa"
                    onClick={() => TestSuaDLds3_aaa(sv.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <small>
          Chú ý: ds3 là state, mọi thay đổi sẽ tự động render lại UI.
        </small>
      </div>
    </div>
  );
};

export default Home;
