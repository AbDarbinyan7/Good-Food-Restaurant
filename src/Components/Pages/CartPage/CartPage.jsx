import MealItem from "Components/Meal/Meal";
import { useEffect } from "react";
import { useContext } from "react";

import { CartContext } from "Routes/AppRoutes";
import "Components/Pages/CartPage/CartPage.scss";

const CartPage = () => {
  const { cartContext, setCartContext } = useContext(CartContext);

  useEffect(() => {
    if (cartContext) {
      console.log(cartContext);
    }
  }, [cartContext]);

  return (
    <div className="cart__section">
      {cartContext &&
        Array.isArray(cartContext) &&
        cartContext.map((meal, i) => {
          return (
            <div key={i} className="cart__section__cart_meal">
              <div className="cart__section__cart_meal__img">
                <img src={meal.strMealThumb}></img>
              </div>
              <div className="cart__section__cart_meal__title-price">
                <p className="cart__section__cart_meal__title-price__title">
                  {meal?.strMeal}
                </p>
                <p>{meal?.price}.00 USD</p>
                <div className="cart__section__cart_meal__title-price__right-side">
                  <div className="cart__section__cart_meal__title-price__right-side__minus-plus">
                    <i className="fa-solid fa-minus"></i>
                  </div>
                  <p>{meal?.quantity}</p>
                  <div className="cart__section__cart_meal__title-price__right-side__minus-plus">
                    <i className="fa-solid fa-plus"></i>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CartPage;
