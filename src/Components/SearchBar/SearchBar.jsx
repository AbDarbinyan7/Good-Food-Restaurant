import { useState, useContext } from "react";
import cx from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

import {
  MealsContext,
  ListViewTypeContext,
  LIST_VIEW_TYPES,
} from "Routes/AppRoutes";

import gridIcon from "Assets/img/gridIcon.svg";
import ColumnIcon from "Components/Icons/ColumnIcon";
import "Components/Home/Home.scss";

function SearchBar({ value, onSearch }) {
  const { mealsContext, setMealsContext } = useContext(MealsContext);
  const { listViewType, setListViewType } = useContext(ListViewTypeContext);
  const [isSearchOpened, setIsSearchOpened] = useState(false);

  return (
    <div className="search_bar__section">
      <div className="search_bar container ">
        <div className={"search_bar__box  d-flex  align-items-center"}>
          <label htmlFor="text" className="search_bar__box__label" tabIndex="1">
            <i className="fa-solid fa-magnifying-glass fa-sm"></i>
            <input
              autoComplete="off"
              type="text"
              id="text"
              className="search_bar__box__label__input"
              onChange={(evt) => onSearch(evt.target.value)}
              placeholder="Search your meal..."
            />
          </label>
          <div className="search_bar__box__mobile_cart_icon">
            <i className="fa-solid fa-cart-shopping"></i>
          </div>
        </div>
        <div className="search_bar__right_side">
          <div
            onClick={(e) => {
              setListViewType(LIST_VIEW_TYPES.TWO_COLUMNS);
            }}
            className={cx({
              search_bar__right_side__list_icon: true,
              change_color: listViewType === LIST_VIEW_TYPES.TWO_COLUMNS,
            })}
          >
            <i className="fa-solid fa-bars fa-xl"></i>
          </div>
          <div
            onClick={(e) => {
              setListViewType(LIST_VIEW_TYPES.GRID);
            }}
            className={cx({
              search_bar__right_side__list_icon: true,
              change_color: listViewType === LIST_VIEW_TYPES.GRID,
            })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22px"
              height="22px"
              fill="currentColor"
              className="bi bi-grid-3x3-gap-fill"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
