import cx from "classnames";
import { useState, useContext, useRef, useEffect } from "react";

import MealItem from "Components/Meal/Meal";
import SearchBar from "Components/SearchBar/SearchBar";
import "Components/Home/Home.scss";
import {
  MealsContext,
  ListViewTypeContext,
  LIST_VIEW_TYPES,
} from "Routes/AppRoutes";

import TriangleLoader from "Components/TriangleLoader/TriangleLoader";

function Home({ selectedPath, loading }) {
  const { mealsContext, setMealsContext } = useContext(MealsContext);
  const { listViewType, setListViewType } = useContext(ListViewTypeContext);
  const [defaultMeals, setDefaultMeals] = useState(mealsContext);

  const measlSection = useRef(null);
  useEffect(() => {
    setDefaultMeals(mealsContext);
  }, [mealsContext]);

  function onSearch(value) {
    if (mealsContext.length) {
      let filterMeals = mealsContext.filter((meal) => {
        return meal.strMeal.toLowerCase().includes(value.toLowerCase());
      });
      setDefaultMeals(filterMeals);
    }
  }

  return (
    <>
      <SearchBar onSearch={onSearch} />

      {loading ? (
        <TriangleLoader />
      ) : (
        <div
          ref={measlSection}
          className={cx({
            "tabs__meals__Section container": true,
            "tabs__meals__Section--two_Columns":
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
      )}
    </>
  );
}

export default Home;
