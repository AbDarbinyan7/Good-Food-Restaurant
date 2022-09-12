import { useEffect, useState,useContext } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import bootstrap from "bootstrap";
import { Link } from "react-router-dom";
import { Navbar, Button, Nav, Carousel} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import 'Components/Pages/SingleCategories/SingleCategories.scss';
import { getOrSetLocalStorageItem } from "Helper/index.js";
import {CATEGORIES} from "Routes/RoutePaths/RoutePaths"
import { TabContext } from "Routes/AppRoutes";

function SingleCategories() {
  const { tabContext, setTabContext } = useContext(TabContext)
  
  const navigate = useNavigate();
  const { mealPath } = useParams()

  const [meals, setMeals] = useState(null);
  const [meal, setMeal] = useState(null)

  useEffect(() => {
    if (mealPath) {
      handleClickMeal(mealPath);
    }
  }, [mealPath, tabContext]);

  function onCallForCurrectTabData(tabName) {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + tabName)
      .then((res) => {
        setMeals(res.data.meals);
      });
  }


  function handleClickMeal(mealPath) {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealPath)
      .then(res => {
        if (res.data.meals) {
          setMeal(res.data.meals[0]);
        }else{
          navigate(CATEGORIES)
        }
      });
  }

  return (
    <div className="sing__categories">
      <div className="single__cat__title">
        <p>{meal?.strMeal}</p>
      </div>
      <div className="sing__cat__img__text">
        <img src={meal?.strMealThumb} height="400px" className="img"></img>
        <p className="sing__cat__text">{meal?.strInstructions}</p>
      </div>
      <div className="single__cat__title">
        <p>Ingridients</p>
      </div>
      <div className="meal__ings__section">
        <ul className="meal__ings">
          <li>{meal?.strIngredient1}</li>
          <li>{meal?.strIngredient2}</li>
          <li>{meal?.strIngredient3}</li>
          <li> {meal?.strYoutube && <a href={meal?.strYoutube} className="video__href text-decoration-none">Go to Meal video!</a>}</li>
        </ul>
      </div>
      
    </div>
  );
}
export default SingleCategories;
