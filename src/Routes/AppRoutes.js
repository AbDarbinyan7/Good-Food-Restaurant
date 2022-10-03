import {Routes,Route} from 'react-router-dom';
import { createContext, useState, useContext} from 'react';

import Tabs from 'Components/Tabs/Tabs'; 
import ErrorPage from 'Components/Pages/ErrorPage/ErrorPage';
import SingleCategories from 'Components/Pages/SingleCategories/SingleCategories';
import CartPage from 'Components/Pages/CartPage/CartPage';
import Header from "Components/Header/Header";
import Footer from "Components/Footer/Footer";
import SearchBar from "Components/SearchBar/SearchBar";


import {HOME, CATEGORIES, HOMECATEGORIESMEAL, NOTFOUND, CART} from "Routes/RoutePaths/RoutePaths"
import { useEffect } from 'react';


export const TabContext = createContext(null)
export const MealsContext = createContext([]);
export const CartContext = createContext([]);
export const ModalContext = createContext([]);
export const ListViewTypeContext = createContext(null);
export const CartLocationContext = createContext(null);



export const modalContextDefault = {
    data: null,
    title: "",
    description: "",
    acceptFunction: null,
    succeedText: "",
    cancelFunction: null,
    cancelText:"",
    isOpenModalFunction:false
  }

  export const LIST_VIEW_TYPES = { TWO_COLUMNS: "TWO_COLUMN", GRID: "GRID" }; 


function AppRoutes (){ 
	const [ tabContext, setTabContext ] = useState([]);
	const [ mealsContext, setMealsContext ] = useState([]);
	const [cartContext, setCartContext] = useState([]);
	const [modalContext, setModalContext] = useState(modalContextDefault);
	const [listViewType, setListViewType] = useState(LIST_VIEW_TYPES.GRID);
	const [cartLocation, setCartLocation] = useState(CartLocationContext);

return (
  <>
    <TabContext.Provider value={{ tabContext, setTabContext }}>
      <MealsContext.Provider value={{ mealsContext, setMealsContext }}>
        <CartContext.Provider value={{ cartContext, setCartContext }}>
          <ModalContext.Provider value={{ modalContext, setModalContext }}>
            <ListViewTypeContext.Provider
              value={{ listViewType, setListViewType }}
            >
              <CartLocationContext.Provider
                value={{ cartLocation, setCartLocation }}
              >
                <Header />
                <div className="main__container">
                  <Routes>
                    <Route path={HOME} element={<Tabs />} />
                    <Route path={CATEGORIES} element={<Tabs />} />
                    <Route path={CATEGORIES + "/:selectedPath"} element={<Tabs />} />
                    <Route
                      path={CATEGORIES + "/:selectedPath" + "/:mealPath"}
                      element={<SingleCategories />}
                    />
                    <Route path={CART} element={<CartPage />} />
                    <Route path={NOTFOUND} element={<ErrorPage />} />
                  </Routes>
                </div>
                <Footer />
              </CartLocationContext.Provider>
            </ListViewTypeContext.Provider>
          </ModalContext.Provider>
        </CartContext.Provider>
      </MealsContext.Provider>
    </TabContext.Provider>
  </>
);
}

export default AppRoutes