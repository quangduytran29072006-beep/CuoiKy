import { Outlet } from "react-router-dom";
// import "./assets/css/layout.css";
// import "./assets/css/fonts.css";
import './assets/css/menu-redesign.css';
import './assets/css/mobile-menu-redesign.css';
import MenuTop from "./layouts/MenuTop";
// import MenuBox from "./layouts/MenuBox";
import Footer from "./layouts/Footer";
const Layout = () => {
  return (
    <body>
      <header id="header" style={{ minHeight: 169 }}>
        <div class="header_top">
          <div class="container_main">
            <MenuTop />
          </div>
        </div>

        <div id="main_menu"></div>

        <div class="header">
          <div class="container_main">
            <div class="logo">
              <a href="/">
                <img
                  src="https://sv2.anhsieuviet.com/2025/11/12/c9c48ed795e219bc40f3.jpg"
                  alt="Logo"
                />
              </a>
            </div>

            {/* <div id="main_menu">
              <MenuBox />
            </div> */}
          </div>
        </div>
      </header>

      <div class="news-home">
        <div class="container_main" style={{ minHeight: 5500 }}>
          <Outlet />
        </div>
      </div>

      <Footer />
    </body>
  );
};

export default Layout;
