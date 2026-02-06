import { Link } from "react-router-dom";
import { useContext,useState } from "react";
import cx from "classnames";



import logo from "Assets/img/goodfood.png";
import "Components/Header/header.scss";
import { CartContext, CartLocationContext } from "Routes/AppRoutes";
import { useRef } from "react";
import { useEffect } from "react";
import ScrollTop from "Components/ScrollTop/ScrollTop";
import  Button  from "Components/Button/Button";
import { css } from "@emotion/react";

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
  const [ smallHeader, setSmallHeader] = useState(false)
  const [ menuModal, setMenuModal] = useState(false)

  useEffect(()=>{
    window.addEventListener("scroll", scrollFunction);

    return () =>{
     window.removeEventListener("scroll", scrollFunction);
    }
  })

  function scrollFunction() {
    if (window.innerWidth > 390) {
      if (window.pageYOffset > 10) {
        if (!smallHeader) {
          setSmallHeader(true);
        }
        return;
      }

      if (smallHeader) {
        setSmallHeader(false);
      }
    }
  
  };

  
  useEffect(() => {
    if (cartRef) {
      setCartLocation(cartRef);
    }
  }, [cartRef]);

function onProductCount() {
  let counter = 0;
  cartContext.map((product) => {
    counter = product.quantityInCart + counter;
  });
  return counter;
}
 


  function onOpenMenuModal() {
    const body = document.querySelector("body");
    const mainContainer = document.querySelector(".main__container");
    const mainLogo = document.querySelector(".log_in_section__mobile__logo__box__wraper");
    const wraper = document.querySelector(".log_in_section__wraper");

    if (!menuModal) {
      body.style.overflowY = "hidden";
      body.style.height = "100%";
      body.style.position = "fixed";
      // mainContainer.style.webkitBackdropFilter = "blur(4px)";
      // mainLogo.style.filter = "blur(60px)";
      // wraper.style.background = "#222831b3";
      setMenuModal(true); 
    }else{
      setMenuModal(false)
      body.style.overflowY = "scroll";
      body.style.height = "100vh";
      body.style.position = "relative";
      // mainContainer.style.webkitBackdropFilter = "blur(0px)";
      // mainLogo.style.filter = "blur(0)";
      // wraper.style.background = "#222831";
    }
  }

  return (
    <>
      <div
        className={cx({
          log_in_section__wraper: true,
          smallHeader: smallHeader,
        })}
      >
        <div></div>
        <div className="log_in_section  container">
          <div className="log_in_section__mobile">
            <Link to={"/"} className="log_in_section__mobile__logo__box ">
              <div className="log_in_section__mobile__logo__box__wraper"></div>
              <img
                src={logo}
                className="log_in_section__left_side__logo__box__logo"
              />
            </Link>
            <div
              className={cx({
                log_in_section__mobile__menu_icon: true,
                active_menu_icon: menuModal,
              })}
              onClick={() => onOpenMenuModal()}
            >
              {/* <i className="fa-solid fa-bars fa-2xl menu_Icon"></i> */}
              <i className="fa-solid fa-caret-down fa-3x menu_Icon"></i>
            </div>
          </div>
          <div
            className={cx({
              log_in_section__mobile__modal: true,
              active_modal: menuModal,
            })}
          >
            <div className="log_in_section__mobile__modal__links container">
              {LINKS.map((link, i) => (
                <a key={i} href={link.src}>
                  {link.label}
                </a>
              ))}
            </div>
            <div className="log_in_section__mobile__modal__buttons  container">
              <div className="conteudo">
                <Button
                  text="Log In"
                  bgColor="#222831"
                  className="conteudo__log_in"
                />
              </div>
              <Button
                text="Sign in"
                bgColor="rgb(0, 0, 255)"
                className="log_in_section__right_side__sign_in"
              />
            </div>
          </div>
          <div className="log_in_section__left_side">
            <Link to={"/"} className="log_in_section__left_side__logo__box">
              <img
                src={logo}
                className="log_in_section__left_side__logo__box__logo"
              />
            </Link>
            <nav>
              {LINKS.map((link, i) => (
                <a key={i} href={link.src}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="log_in_section__right_side">
            <div className="conteudo">
              <Button
                text="Log In"
                bgColor="#222831"
                className="conteudo__log_in"
              />
            </div>
            <Button
              text="Sign in"
              bgColor="rgb(0, 0, 255)"
              className="log_in_section__right_side__sign_in"
            />
            <Link
              ref={cartRef}
              to="/cart"
              className="log_in_section__right_side__cart__btn button"
            >
              <div className="log_in_section__right_side__cart__btn__cart_quantity">
                <p>{onProductCount()}</p>
              </div>
              <i className="fa-solid fa-cart-shopping"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
