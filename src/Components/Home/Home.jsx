import cx from "classnames";
import { useState, useContext } from "react";

import MealItem from "Components/Meal/Meal";
import "Components/Home/Home.scss";
import { MealsContext } from "Routes/AppRoutes";

function Home({ currectTabData, selectedPath }) {
  const { mealsContext, setmealsContext } = useContext(MealsContext);

  const [isSearchOpened, setIsSearchOpened] = useState(false);
  const [defaultMeals, setDefaultMeals] = useState(currectTabData);

  function onSearch(value) {
    if (currectTabData) {
      let filterMeals = currectTabData.filter((meal) => {
        return meal.strMeal.toLowerCase().includes(value.toLowerCase());
      });
      setDefaultMeals(filterMeals);
    }
  }

  return (
    <>
      <div className="search_bar">
        <div
          className={cx({
            "search_bar__box  d-flex  align-items-center": true,
            opened: isSearchOpened,
          })}
          onClick={() => setIsSearchOpened(true)}
        >
          <label htmlFor="text" className="search_bar__box__label" tabIndex="1">
            <i className="fa-solid fa-magnifying-glass fa-lg"></i>
            <input
              autoComplete="off"
              type="text"
              id="text"
              className="search_bar__box__label__input"
              onChange={(evt) => onSearch(evt.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="tabs__meals__Section container">
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
  );
}

export default Home;
