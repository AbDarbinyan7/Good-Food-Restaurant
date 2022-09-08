import React, { useRef, useEffect, useState, useContext, Fragment } from "react";
import { useParams  } from "react-router";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Triangle } from "react-loader-spinner";

import  logo  from "Assets/img/goodfood.png";

import {TabContext} from "Components/Routes/AppRoutes"
import { generateUniqueId} from "Components/Helper/index"
import { CATEGORIES } from "Components/Routes/RoutePaths/RoutePaths"

import 'Components/Tabs/Tabs.scss'; 
const LINKS = [
  {label:"About us", src:"#"},
  {label:"News", src:"#"},
  {label:"Work with us", src:"#"},
  {label:"Cooperation", src:"#"},
];

function Tabs() {
  const {tabContext, setTabContext } = useContext(TabContext)

  const scrollLineRef = useRef(null);
  const tabsRef = useRef([]);

  const navigate = useNavigate();

  const { selectedPath } = useParams();

  const [tabs, setTabs] = useState(null);
  const [defaultTab, setDefaultTab] = useState(null);
  const [defaultTabIndex, setDefaultTabIndex] = useState(0);
  const [activeDiv, SetActiveDiv] = useState(null);
  const [index, setIndex] = useState(null);

  const [currectTabData, setCurrectTabData] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    onCallForTabsData();
  }, []);

  useEffect(() => {
  }, [currectTabData]);

  useEffect(() => {
    if (
      (defaultTab && defaultTabIndex) ||
      (defaultTab && defaultTabIndex === 0)
    ) {
      onCallForCurrectTabData(defaultTab.strCategory);
    }
  }, [defaultTabIndex, defaultTab]);

  useEffect(() => {
    onCheckPath(selectedPath, tabs, activeDiv);
  }, [selectedPath, tabs, activeDiv]);

  useEffect(() => {
    setInitialTabs(tabs);
  }, [tabs]);

  useEffect(() => {
    if ((!activeDiv, defaultTabIndex, defaultTab)) {
      tabsOnclick(tabsRef[defaultTabIndex], defaultTabIndex, defaultTab);
    }
  }, [defaultTab, defaultTabIndex, tabsRef, activeDiv]);

  useEffect(() => {
    onChangeStyles();
  }, [activeDiv, defaultTab]);

  
  function onCallForTabsData() {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
      .then((res) => setTabs(res.data.meals.slice(0,8)));
  }

  function onAddPrice(data) {
    const newMealsArr = data.map((meal) => {
      meal.price = Math.ceil(Math.random() * 15)+3;
      return meal
    })
    setCurrectTabData(newMealsArr)
  }

  function onCallForCurrectTabData(tabName) {
    setLoader(true);
    axios
      .get("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + tabName)
      .then((res) => {
        if (res.data.meals) {
           onAddPrice(res.data.meals);
        }
        setLoader(false);
      }) 
  }

  function setInitialTabs(tabs) {
    if (tabs) {
      tabs.forEach((tab, i) => {
        tab.id = generateUniqueId();
      });
    }
  }

  function onCheckPath(selectedPath, tabs, activeDiv) {
    if (tabs) {
      if (!selectedPath) {
        setDefaultTab(tabs[0]);
        setDefaultTabIndex(0);
      } else if (selectedPath && !activeDiv) {
        tabs.find((tab, index) => {
          if (tab.strCategory.toLowerCase() === selectedPath) {
            setDefaultTab(tab);
            setDefaultTabIndex(index);
          }
        });
      }
    }
  }

  function tabsOnclick(currentActiveDiv, index, tab) {
    setTabContext(tab)
    SetActiveDiv(currentActiveDiv);
    setIndex(index);
    setDefaultTab(tab);
    setDefaultTabIndex(index);
    navigate(`${CATEGORIES}/${tab.strCategory.toLowerCase()}`);
  }

  function onChangeStyles() {
    let count = 0;
    if (activeDiv) {
      for (let i = 0; i < Object.keys(tabsRef).length; i++) {
        if (i < index) {
          count += tabsRef[i].offsetWidth;
        }
      }

      const scrollLine = scrollLineRef.current;
      scrollLine.style.width = activeDiv.offsetWidth + "px";
      scrollLine.style.transform = "translate(" + count + "px)";
    }
    const scrollLine = scrollLineRef.current;

    if ( scrollLine && tabsRef[defaultTabIndex]) {
      scrollLine.style.width = tabsRef[defaultTabIndex].offsetWidth + "px";
    }
    if (activeDiv !== null && activeDiv !== tabsRef[0]) {
      tabsRef[0]?.classList?.remove("active");
    }
  }
 
  return (
    <div className="tabs__container">
      <div className="log_in_section container">
        <div className="log_in_left_side">
          <div className="logo__box">
            <img src={logo} className="logo" />
          </div>
          <nav>
            {LINKS.map((link,i) => (
              <a key={i} href={link.src}>{link.label}</a>
            ))}
          </nav>
        </div>

        <div className="btn_group_box">
          <button className="login__btn btn__styles">Log In</button>
          <button className="signin__btn btn__styles">Sign In</button>
          <Link to="/cart" className="cart__btn btn__styles">
            <div className="cart_quantity">
              <p>0</p>
            </div>
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
        </div>
      </div>
      <div className="tabs__section">
        <div className="tabs">
          {tabs &&
            Array.isArray(tabs) &&
            tabs.map((tab, index) => {
              return (
                <React.Fragment key={index.toString()}>
                  {index === 0 && (
                    <div ref={scrollLineRef} className="scroll__line"></div>
                  )}
                  <div
                    ref={(el) => (tabsRef[index] = el)}
                    className={`tab ${
                      tab.id === defaultTab?.id ? "active" : ""
                    }`}
                    onClick={() => {
                      tabsOnclick(tabsRef[index], index, tab);
                    }}
                  >
                    <p className="tab__title">{tab.strCategory}</p>
                  </div>
                </React.Fragment>
              );
            })}
        </div>
      </div>
      {loader ? (
        <div className="loader">
          <Triangle
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <div className="tabs__meals__Section container">
          <>
            {currectTabData &&
              Array.isArray(currectTabData) &&
              currectTabData.map((meal, index) => {
                return (
                  <Link
                    key={index.toString()}
                    to={`${CATEGORIES}/${selectedPath}/${meal.idMeal}`}
                  >
                    <div className="meal">
                      <div className="price_box">
                        <p className="price">{meal.price}.00 USD</p>
                      </div>
                      <div className="title__modal">
                        <div className="add_buy__btns">
                          <button className="buy_btn login__btn btn__styles">
                            Buy Now
                          </button>
                          <button className="add_btn  btn__styles">
                            Add To Cart
                          </button>
                        </div>
                        <p className="meal__title"> {meal.strMeal}</p>
                      </div>
                      <img src={meal.strMealThumb} className="meal__img"></img>
                    </div>
                  </Link>
                );
              })}
          </>
        </div>
      )}
    </div>
  );
}
export default Tabs