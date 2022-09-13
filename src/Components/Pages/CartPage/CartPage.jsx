import { useEffect, useMemo, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";

import {
  CartContext,
  ModalContext,
  modalContextDefault,
} from "Routes/AppRoutes";
import "Components/Pages/CartPage/CartPage.scss";
import BasicModal from "../BasicModal/BasicModal";
import { HOME } from "Routes/RoutePaths/RoutePaths";

const CartPage = () => {
  const { cartContext, setCartContext } = useContext(CartContext);
  const { modalContext, setModalContext } = useContext(ModalContext);

  const navigatePage = useNavigate();

  useEffect(() => {
    if (!cartContext.length) {
      navigatePage(HOME);
    }else if(cartContext.length){
      
    }
  }, [cartContext]);

  function productMinus(meal, isMinus = false) {
    let newCartList = [];
    let showModalContent = null;

    newCartList = cartContext.map((product) => {
      if (product.idMeal === meal.idMeal) {
        if (product.quantity === 1 && isMinus) {
          showModalContent = meal;
          return product;
        }

        product.quantity = isMinus
          ? product.quantity - 1
          : product.quantity + 1;
      }
      return product;
    });

    if (showModalContent) {
      setModalContext({
        ...modalContext,
        data: showModalContent,
        title: "do you want to delete this product from the Basket",
        description: "After deleting, the product will disappear from the cart",
        acceptFunction: () => acceptDeleteProduct(meal),
        succeedText: "Delete",
        cancelFunction: () => onCloseModal(),
        cancelText: "No yet",
      });
    }

    setCartContext(newCartList);
  }

  function acceptDeleteProduct(meal) {
    let newCartList = cartContext.filter((prod) => {
      return prod.idMeal !== meal.idMeal;
    });

    setCartContext(newCartList);
    setModalContext(modalContextDefault);
  }
  function onCloseModal() {
    setModalContext(modalContextDefault);
  }

  const productsPrice = useMemo(() => {
    let totalPrice = 0;
    let initialValue = 0;

    if (cartContext.length > 0) {
      totalPrice = cartContext.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.price * currentValue.quantity;
      }, initialValue);
    }

    return totalPrice;
  }, [cartContext]);

  return (
    <>
      <BasicModal />
      <div className="cart__section container">
        <div className="cart__section__left-side">
          <p className="cart__section__left-side-title__basket">Basket</p>
          {cartContext &&
            Array.isArray(cartContext) &&
            cartContext.map((meal, i) => {
              return (
                <div key={i} className="cart__section__left-side__cart_meal">
                  <div className="cart__section__left-side__cart_meal__img-title">
                    <div className="cart__section__left-side__cart_meal__img-title__img">
                      <img src={meal.strMealThumb}></img>
                    </div>
                    <p className="cart__section__left-side__cart_meal__img-title__title">
                      {meal?.strMeal}
                    </p>
                  </div>
                  <div className="cart__section__left-side__cart_meal__price-buttons">
                    <p>{meal?.price}.00 USD</p>
                    <div className="cart__section__left-side__cart_meal__price-buttons__right-side">
                      <div
                        className="cart__section__left-side__cart_meal__price-buttons__right-side__minus-plus"
                        onClick={() => productMinus(meal, true)}
                      >
                        <i className="fa-solid fa-minus"></i>
                      </div>
                      <p>{meal?.quantity}</p>
                      <div
                        className="cart__section__left-side__cart_meal__price-buttons__right-side__minus-plus"
                        onClick={() => productMinus(meal, false)}
                      >
                        <i className="fa-solid fa-plus"></i>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="cart__section__right_side">
          <div className="cart__section__right_side__total_price">
            <p className="cart__section__right_side__total_price__price">
              Total Price
            </p>
            <p>{productsPrice} USD</p>
          </div>
          <form className="cart__section__right_side__form">
            <div className="cart__section__right_side__form__check">
              <input
                className="cart__section__right_side__form__check__input"
                type="checkBox"
              />
              <p>Pay on delivery</p>
            </div>

            <button className="cart__section__right_side__form__button">
              Order
            </button>
            <p className="cart__section__right_side__form__inform">
              We inform you that after receiving the request, our operators will
              contact you to clarify the delivery conditions
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default CartPage;
