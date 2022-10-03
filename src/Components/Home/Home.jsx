import cx from "classnames";
import { useState, useContext, useRef } from "react";

import MealItem from "Components/Meal/Meal";
import "Components/Home/Home.scss";
import {
  MealsContext,
  ListViewTypeContext,
  LIST_VIEW_TYPES,
} from "Routes/AppRoutes";

function Home({ selectedPath }) {
  const { mealsContext, setmealsContext } = useContext(MealsContext);
  const { listViewType, setListViewType } = useContext(ListViewTypeContext);

  const measlSection = useRef(null);

  const [defaultMeals, setDefaultMeals] = useState(mealsContext);

  return (
    <>
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
    </>
  );
}

export default Home;
