import MealItem from "Components/Meal/Meal";
import { useEffect } from "react";
import { useContext } from "react";

import { CartContext } from "Routes/AppRoutes";
import "Components/Pages/CartPage/CartPage.scss";
import { useMemo } from "react";

const CartPage = () => {
  const { cartContext, setCartContext } = useContext(CartContext);

  function productMinus(meal, isMinus = false) {
    let newCartList = [];

    newCartList = cartContext.map((product) => {
      if (product.idMeal === meal.idMeal) {
        if (!isMinus) {
          product.quantity = product.quantity + 1;
        } else if (isMinus) {
          product.quantity = product.quantity - 1;
        }
      }
      return product;
    });

    setCartContext(newCartList);
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
