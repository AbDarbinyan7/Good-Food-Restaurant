import { useState, useContext } from "react";
import cx from "classnames";

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
    <div className="search_bar container">
      <div className={"search_bar__box  d-flex  align-items-center"}>
        <label htmlFor="text" className="search_bar__box__label" tabIndex="1">
          <i className="fa-solid fa-magnifying-glass fa-lg"></i>
          <input
            autoComplete="off"
            type="text"
            id="text"
            className="search_bar__box__label__input"
            onChange={(evt) => onSearch(evt.target.value)}
            placeholder="Search your meal..."
          />
        </label>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="30px"
            fill="currentColor"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
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
            width="100%"
            height="25px"
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
  );
}

export default SearchBar;
