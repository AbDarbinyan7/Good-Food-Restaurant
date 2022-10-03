import { Link } from "react-router-dom";
import { useContext,useState } from "react";


import logo from "Assets/img/goodfood.png";
import "Components/Header/header.scss";
import { CartContext, CartLocationContext } from "Routes/AppRoutes";
import { useRef } from "react";
import { useEffect } from "react";

const LINKS = [
  { label: "About us", src: "#" },
  { label: "News", src: "#" },
  { label: "Work with us", src: "#" },
  { label: "Cooperation", src: "#" },
];

function Header() {
  const { cartContext, setCartContext } = useContext(CartContext);
  const { cartLocation, setCartLocation } = useContext(CartLocationContext);
  const cartRef = useRef(null)

  useEffect(()=>{
    if (cartRef) {
      setCartLocation(cartRef)
    }

  },[cartRef])


  function onProductCount() {
    let counter = 0
    cartContext.map((product)=>{
      counter = product.quantityInCart + counter;
    })
    return  counter
  }

  return (
    <div className="log_in_section__wraper">
      <div className="log_in_section container">
        <div className="log_in_left_side">
          <Link to={"/"} className="logo__box">
            <img src={logo} className="logo" />
          </Link>
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
          <Link ref={cartRef} to="/cart" className="cart__btn btn__styles">
            <div className="cart_quantity">
              <p>{onProductCount()}</p>
            </div>
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
