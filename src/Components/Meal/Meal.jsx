import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { TabContext } from "Routes/AppRoutes";
import { CartContext } from "Routes/AppRoutes";
import { useEffect } from "react";

import { CART, CATEGORIES } from "Routes/RoutePaths/RoutePaths";
import "Components/Meal/Meal.scss";

function MealItem({ selectedPath, meal }) {
  const { tabContext, setTabContext } = useContext(TabContext);
  const { cartContext, setCartContext } = useContext(CartContext);

  const navigate = useNavigate();
  useEffect(() => {}, [cartContext]);

  function stopPropagation(e, path) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  function setParams(meal) {
    let newCartList = [];

    const isProductExist = cartContext.find((product) => {
      return product.idMeal === meal.idMeal;
    });

    if (!isProductExist) {
      newCartList = [...cartContext, meal];
    }
    if (isProductExist) {
      newCartList = cartContext.map((product) => {
        if (product.idMeal === meal.idMeal) {
          product.quantity = product.quantity + 1;
        }
        return product;
      });
    }

    setCartContext(newCartList);
  }

  return (
    <Link to={`${CATEGORIES}/${selectedPath}/${meal.idMeal}`}>
      <div className="meal">
        <div className="price_box">
          <p className="price">{meal.price}.00 USD</p>
        </div>
        <div className="title__modal">
          <div className="add_buy__btns">
            <button
              onClick={(e) => {
                stopPropagation(e);
                navigate(CART);
                setCartContext([...cartContext, meal]);
              }}
              className="buy_btn login__btn btn__styles"
            >
              Buy Now
            </button>
            <button
              onClick={(e) => {
                stopPropagation(e);
                setParams(meal);
              }}
              className="add_btn  btn__styles"
            >
              Add To Cart
            </button>
          </div>
          <p className="meal__title"> {meal.strMeal}</p>
        </div>
        <img src={meal.strMealThumb} className="meal__img"></img>
      </div>
    </Link>
  );
}

export default MealItem;
