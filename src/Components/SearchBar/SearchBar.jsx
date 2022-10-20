import { useState, useContext, useRef, useEffect } from "react";
import cx from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

import {
  MealsContext,
  ListViewTypeContext,
  LIST_VIEW_TYPES,
  CartLocationContext,
  CartContext,
} from "Routes/AppRoutes";

import gridIcon from "Assets/img/gridIcon.svg";
import ColumnIcon from "Components/Icons/ColumnIcon";
import "Components/Home/Home.scss";
import { Link } from "react-router-dom";
import { onProductCount } from "Components/Header/Header";

function SearchBar({ value, onSearch }) {
  const { mealsContext, setMealsContext } = useContext(MealsContext);
  const { listViewType, setListViewType } = useContext(ListViewTypeContext);
  const { cartContext, setCartContext } = useContext(CartContext);
  const [isSearchOpened, setIsSearchOpened] = useState(false);
  const { cartLocation, setCartLocation } = useContext(CartLocationContext);

  const mobileCarRef = useRef(null);

  function onProductCount() {
    let counter = 0;
    cartContext.map((product) => {
      counter = product.quantityInCart + counter;
    });
    return counter;
  }

  useEffect(() => {
    if (mobileCarRef) {
      if (window.innerWidth <= 390) {
        setCartLocation(mobileCarRef);
      }
    }
  }, [mobileCarRef]);

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
          <Link
            to="/cart"
            ref={mobileCarRef}
            className="search_bar__box__mobile_cart_icon"
          >
            <div className="log_in_section__right_side__cart__btn__cart_quantity">
              <p>{onProductCount()}</p>
            </div>
            <i className="fa-solid fa-cart-shopping"></i>
          </Link>
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
