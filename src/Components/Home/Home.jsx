import cx from "classnames";
import { useState, useContext, useRef, useEffect } from "react";

import MealItem from "Components/Meal/Meal";
import SearchBar from "Components/SearchBar/SearchBar";
import "Components/Home/Home.scss";

import {
  CartContext,
  MealsContext,
  ListViewTypeContext,
  LIST_VIEW_TYPES,
  ViewedMEalsContext,
} from "Routes/AppRoutes.js";

import TriangleLoader from "Components/TriangleLoader/TriangleLoader";
import CustumCarousel from "Components/CustumCarousel/CustumCarousel";
import { getOrSetLocalStorageItem } from "Helper/index.js";

function Home({ selectedPath, loading }) {
  const { mealsContext, setMealsContext } = useContext(MealsContext);
  const { listViewType, setListViewType } = useContext(ListViewTypeContext);
  const [defaultMeals, setDefaultMeals] = useState(mealsContext);
  const { cartContext, setCartContext } = useContext(CartContext);
  const { viewedMeals, setViewedMeals } = useContext(ViewedMEalsContext);

  const [viewedMealsInLoc, setViewedMealsInLoc] = useState(null);

  const measlSection = useRef(null);
  useEffect(() => {
    setDefaultMeals(mealsContext);
  }, [mealsContext]);

  useEffect(() => {
    setViewedMealsInLoc(getOrSetLocalStorageItem("viewedMeals"));
  }, []);

  function onSearch(value) {
    if (mealsContext.length) {
      let filterMeals = mealsContext.filter((meal) => {
        return meal.strMeal.toLowerCase().includes(value.toLowerCase());
      });
      setDefaultMeals(filterMeals);
    }
  }
  function onCheckLocData() {
    if (viewedMealsInLoc) {
      return viewedMealsInLoc;
    } else {
      return [];
    }
  }

  return (
    <>
      <SearchBar onSearch={onSearch} />
      <div className="custum_section container">
        {loading ? (
          <TriangleLoader />
        ) : (
          <>
            <span className="section__title">
              <p>Meals</p>
              <div>
                <i className="fa-solid fa-pizza-slice fa-xs "></i>
              </div>
            </span>
            <div
              ref={measlSection}
              className={cx({
                "tabs__meals__section ": true,
                "tabs__meals__section--two_Columns":
                  listViewType === LIST_VIEW_TYPES.TWO_COLUMNS,
              })}
            >
              {defaultMeals &&
                Array.isArray(defaultMeals) &&
                defaultMeals.map((meal, index) => {
                  return (
                    <MealItem
                      selectedPath={selectedPath}
                      meal={meal}
                      key={index.toString()}
                    />
                  );
                })}
            </div>
          </>
        )}
      </div>
      <CustumCarousel
        title="Last viewed products"
        iconName="fa-solid fa-eye fa-xs "
        data={onCheckLocData()}
        selectedPath={selectedPath}
      />
      <CustumCarousel
        title="Products in cart"
        iconName="fa-solid fa-cart-shopping fa-xs "
        data={cartContext}
        selectedPath={selectedPath}
      />
    </>
  );
}

export default Home;
