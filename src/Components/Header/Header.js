import { Link } from "react-router-dom";

import logo from "Assets/img/goodfood.png";
import "Components/Header/header.scss";
import { useContext } from "react";

const LINKS = [
  { label: "About us", src: "#" },
  { label: "News", src: "#" },
  { label: "Work with us", src: "#" },
  { label: "Cooperation", src: "#" },
];

function Header() {
  return (
    <div className="log_in_section container">
      <div className="log_in_left_side">
        <div className="logo__box">
          <img src={logo} className="logo" />
        </div>
        <nav>
          {LINKS.map((link, i) => (
            <a key={i} href={link.src}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="btn_group_box">
        <button className="login__btn btn__styles">Log In</button>
        <button className="signin__btn btn__styles">Sign In</button>
        <Link to="/cart" className="cart__btn btn__styles">
          <div className="cart_quantity">
            <p>{}</p>
          </div>
          <i className="fa-solid fa-cart-shopping"></i>
        </Link>
      </div>
    </div>
  );
}

export default Header;
