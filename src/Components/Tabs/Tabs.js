import React, { useRef, useEffect, useState, useContext, Fragment } from "react";
import { useParams  } from "react-router";
import { Link } from "react-router-dom";  
import { useNavigate } from "react-router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { TabContext, setCartContext } from "Routes/AppRoutes";
import { generateUniqueId} from "Helper/index"
import { CATEGORIES } from "Routes/RoutePaths/RoutePaths"

import 'Components/Tabs/Tabs.scss'; 

import  TriangleLoader  from "Components/TriangleLoader/TriangleLoader";
import  Home from "Components/Home/Home";




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
      meal.quantity = 1
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
    <>
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
        <TriangleLoader />
      ) : (
        <Home currectTabData={currectTabData} selectedPath={selectedPath} />
      )}
    </>
  );
}
export default Tabs