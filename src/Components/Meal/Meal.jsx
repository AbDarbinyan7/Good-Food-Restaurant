import cx from "classnames";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useContext } from "react";
import {
  CartContext,
  MealsContext,
  CartLocationContext,
} from "Routes/AppRoutes";
import { useEffect, useState } from "react";

import { CART, CATEGORIES } from "Routes/RoutePaths/RoutePaths";
import "Components/Meal/Meal.scss";
import { useRef } from "react";

function MealItem({ selectedPath, meal }) {
  const { cartContext, setCartContext } = useContext(CartContext);
  const { mealsContext, setMealsContext } = useContext(MealsContext);
  const { cartLocation, setCartLocation } = useContext(CartLocationContext);

  const mealRef = useRef(null);
  const realMealRef = useRef(null);

  const [outOfStockFlag, setOutOfStockFlag] = useState(false);
  const [cloneMeal, setCloneMeal] = useState();
  const [showAnimation, setShowAnimation] = useState(false);
  const [mealLoc, setMealLoc] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (showAnimation) {
      onMealAnimate(realMealRef);
    }
  }, [showAnimation, mealRef]);

  function stopPropagation(e) {
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
      newCartList = [...cartContext, { ...meal, quantityInCart: 1 }];
    }

    const isProductExistInMeals = mealsContext.find((el) => {
      return el.idMeal === meal.idMeal;
    });

    if (isProductExist && isProductExistInMeals) {
      newCartList = cartContext.map((product) => {
        if (
          product.idMeal === meal.idMeal &&
          isProductExist.quantityInCart < isProductExistInMeals.quantity
        ) {
          product.quantityInCart = product.quantityInCart + 1;
        }
        return product;
      });
    }
    setCloneMeal(meal);
    setCartContext(newCartList);
  }

  function checkDisable(meal) {
    const isProductExist = cartContext.find((product) => {
      return product.idMeal === meal.idMeal;
    });

    const isProductExistInMeals = mealsContext.find((el) => {
      return el.idMeal === meal.idMeal;
    });

    if (isProductExist && isProductExistInMeals) {
      if (isProductExist.quantityInCart === isProductExistInMeals.quantity) {
        return true;
      } else {
        return false;
      }
    }
  }

  function onMealAnimate(realMealRef) {
    if (mealRef && cartLocation && realMealRef) {
      const cartLoc = cartLocation.current.getBoundingClientRect();
      const mealDiv = mealRef.current;
      const realMealLoc = realMealRef.current.getBoundingClientRect();

      mealDiv.style.left = realMealLoc.left + "px";
      mealDiv.style.top = realMealLoc.top + "px";
      mealDiv.style.transform = "scale(0.2)";

      setTimeout(() => {
        console.log(cartLoc);
        mealDiv.style.left = cartLoc.left - 70 + "px";
        mealDiv.style.top = cartLoc.top - 70 + "px";
      }, 100);

      setTimeout(() => {
        mealDiv.style.opacity = "0";
      }, 450);

      setTimeout(() => {
        setShowAnimation(false);
      }, 800);
    }
  }

  return (
    <>
      <Link
        to={`${CATEGORIES}/${selectedPath}/${meal.idMeal}`}
        className="meal__link"
      >
        {cloneMeal?.idMeal === meal.idMeal && showAnimation && (
          <div
            ref={mealRef}
            onClick={(e) => stopPropagation(e)}
            className={cx({
              meal: true,
              mealClone: true,
            })}
          >
            <div className="meal__img">
              <img src={meal.strMealThumb}></img>
            </div>
          </div>
        )}
        <div
          ref={realMealRef}
          className={cx({
            meal: true,
          })}
        >
          <div className="price_box">
            <p className="price">{meal.price}.00 USD</p>
          </div>
          <div className="title__modal">
            <div className="add_buy__btns">
              <button
                onClick={(e) => {
                  stopPropagation(e);
                  navigate(CART);
                  setParams(meal);
                }}
                className={"buy_btn login__btn btn__styles"}
              >
                Buy Now
              </button>
              <button
                onClick={(e) => {
                  stopPropagation(e);
                  setParams(meal);
                  setShowAnimation(true);
                }}
                className={cx({
                  "add_btn btn__styles": true,
                  disabled: checkDisable(meal),
                })}
              >
                Add To Cart
              </button>
            </div>
            <p className="meal__title"> {meal.strMeal}</p>
          </div>
          <div className="meal__img">
            <img src={meal.strMealThumb}></img>
          </div>
        </div>
      </Link>
    </>
  );
}

export default MealItem;
