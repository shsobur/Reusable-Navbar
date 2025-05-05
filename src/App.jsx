// Files__
import "./App.css";
import Home from "./components/Home/Home";
import Blogs from "./components/Blogs/Blogs";
// React__
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
// React icons__
import { RxCross1 } from "react-icons/rx";
import { PiSignIn } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { IoIosMenu } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";
import { HiMiniUserCircle } from "react-icons/hi2";
import { RiBloggerLine, RiContactsBook2Line } from "react-icons/ri";
import { AiOutlineAlipay, AiOutlineShopping } from "react-icons/ai";
import { MdHistoryToggleOff, MdOutlineSpaceDashboard } from "react-icons/md";

function App() {
  const menuRef = useRef();
  const [open, setOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle Close Dropdown__
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Scrolling__
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

  // Handle Stop Scroll__
  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "auto";
      return;
    }
    document.body.style.overflow = "hidden";
  }, [menuOpen]);

  return (
    <>
      <nav>
        {/* Desktop layout__ */}
        <div
          id={isScrollingDown ? "navbar_close" : "navbar_open"}
          className="main_navbar_container"
        >
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
                  <MdOutlineSpaceDashboard />
                  Dashboard
                </a>
                <a href="#" className="dropdown_item">
                  <PiSignIn /> Sign In
                </a>
              </div>
            </div>

            <div className="mobile_menu_container">
              <span onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <RxCross1 /> : <IoIosMenu />}
              </span>
            </div>
          </div>
        </div>
        {/* Mobile layout__ */}

        <div
          id={menuOpen ? "" : "menu_close"}
          className="main_mobile_menu_container"
        >
          <div className="mobile_menu_routes">
            <ul>
              <li>
                <IoHomeOutline /> _Home
              </li>
              <li>
                <AiOutlineShopping /> _Shop
              </li>
              <li>
                <MdHistoryToggleOff /> _Order
              </li>
              <li>
                <RiBloggerLine /> _Blogs
              </li>
              <li>
                <FiMessageCircle /> _About Us
              </li>
              <li>
                <RiContactsBook2Line /> _Contact Us
              </li>
            </ul>

            <div className="others_routes_container">
              <ul>
                <li>
                  <CgProfile /> Profile
                </li>
                <li>
                  <MdOutlineSpaceDashboard /> Dashboard
                </li>
                <li>
                  <PiSignIn />
                  Sign In
                </li>
              </ul>
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