import cx from "classnames";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useContext, useRef, useEffect, useState } from "react";
import {
  CartContext,
  MealsContext,
  CartLocationContext,
  ViewedMEalsContext,
} from "Routes/AppRoutes";

import { CART, CATEGORIES } from "Routes/RoutePaths/RoutePaths";
import "Components/Meal/Meal.scss";
import Button from "Components/Button/Button";

function MealItem({ selectedPath, meal = {} }) {
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
    console.log("asada");
  }

  function setParams(meal) {
    console.log("yaaaayy");
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
      return product?.idMeal === meal?.idMeal;
    });

    const isProductExistInMeals = mealsContext.find((el) => {
      return el?.idMeal === meal?.idMeal;
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
      console.log(mealDiv);

      setTimeout(() => {
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
        to={`${CATEGORIES}/${selectedPath}/${meal?.idMeal}`}
        className="meal_link"
      >
        {cloneMeal?.idMeal === meal?.idMeal && showAnimation && (
          <div
            ref={mealRef}
            onClick={(e) => stopPropagation(e)}
            className={cx({
              meal_link__meal: true,
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
            meal_link__meal: true,
          })}
        >
          <div className="meal_link__meal__price_box">
            <p className="meal_link__meal__price_box__price">
              {meal?.price}.00 USD
            </p>
          </div>
          <div className="meal_link__meal__modal">
            <div className="meal_link__meal__modal__add_buy__btns">
              <Button
                onClick={(e) => {
                  stopPropagation(e);
                  navigate(CART);
                  setParams(meal);
                }}
                text="Buy now"
                bgColor="rgb(0, 165, 0)"
                className="buy_btn"
              />
              <button
                onClick={(e) => {
                  stopPropagation(e);
                  setParams(meal);
                  setShowAnimation(true);
                }}
                className={cx({
                  "add_btn button": true,
                  disabled: checkDisable(meal),
                })}
              >
                Add To Cart
              </button>
            </div>
            <p className="meal_link__meal__modal__title"> {meal?.strMeal}</p>
          </div>
          <div className="meal_link__meal__img">
            <img src={meal?.strMealThumb}></img>
          </div>
        </div>
      </Link>
    </>
  );
}

export default MealItem;
