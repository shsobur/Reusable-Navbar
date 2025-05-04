import { useState } from "react";
import "./App.css";
import Blogs from "./components/Blogs/Blogs";
import Home from "./components/Home/Home";
import { useRef } from "react";
import { useEffect } from "react";
import { HiMiniUserCircle } from "react-icons/hi2";
import { AiOutlineAlipay } from "react-icons/ai";

function App() {
  const [isScrollingDown, setIsScrollingDown] = useState(null);
  console.log(isScrollingDown);
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Handle close dropdown if clicked outside__
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Scroll__

  useEffect(() => {
    let lastScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        setIsScrollingDown(true);
      } else if (scrollTop < lastScrollTop) {
        setIsScrollingDown(false);
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav>
        <div id={isScrollingDown ? "navbar_close" : "navbar_open" } className="main_navbar_container">
          <div className="navbar_content_container">
            <h1 className="navbar_logo">
              <AiOutlineAlipay />
            </h1>

            <ul className="navbar_routes_container">
              <li>Home</li>
              <li>Shop</li>
              <li>Order</li>
              <li>Blogs</li>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>{isScrollingDown ? "True" : "False"}</li>
            </ul>

            <div className="dropdown_wrapper" ref={menuRef}>
              <button
                className="dropdown_button"
                onClick={() => setOpen(!open)}
              >
                <HiMiniUserCircle />
              </button>
              <div className={`dropdown_menu ${open ? "open" : ""}`}>
                <a href="#" className="dropdown_item">
                  Dashboard
                </a>
                <a href="#" className="dropdown_item">
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div>
        <Home></Home>
        <Blogs></Blogs>
      </div>
    </>
  );
}

export default App;
