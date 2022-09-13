import {Routes,Route} from 'react-router-dom';
import { createContext, useState, useContext} from 'react';

import Tabs from 'Components/Tabs/Tabs'; 
import ErrorPage from 'Components/Pages/ErrorPage/ErrorPage';
import SingleCategories from 'Components/Pages/SingleCategories/SingleCategories';
import CartPage from 'Components/Pages/CartPage/CartPage';
import Header from "Components/Header/Header";
import Footer from "Components/Footer/Footer";

import {HOME, CATEGORIES, HOMECATEGORIESMEAL, NOTFOUND, CART} from "Routes/RoutePaths/RoutePaths"
import { useEffect } from 'react';

export const TabContext = createContext(null)
export const MealsContext = createContext([]);
export const CartContext = createContext([]);
export const ModalContext = createContext([]);



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

function AppRoutes (){ 
	const [ tabContext, setTabContext ] = useState([]);
	const [ mealsContext, setMealsContext ] = useState([]);
	const [cartContext, setCartContext] = useState([]);
	const [modalContext, setModalContext] = useState(modalContextDefault);

return (
  <>
    <TabContext.Provider value={{ tabContext, setTabContext }}>
      <MealsContext.Provider value={{ mealsContext, setMealsContext }}>
        <CartContext.Provider value={{ cartContext, setCartContext }}>
          <ModalContext.Provider value={{ modalContext, setModalContext }}>
            <Header />
            <div className="main__container">
              <Routes>
                <Route path={HOME} element={<Tabs />} />
                <Route path={CATEGORIES} element={<Tabs />} />
                <Route
                  path={CATEGORIES + "/:selectedPath"}
                  element={<Tabs />}
                />
                <Route
                  path={CATEGORIES + "/:selectedPath" + "/:mealPath"}
                  element={<SingleCategories />}
                />
                <Route path={CART} element={<CartPage />} />
                <Route path={NOTFOUND} element={<ErrorPage />} />
              </Routes>
            </div>
            <Footer />
          </ModalContext.Provider>
        </CartContext.Provider>
      </MealsContext.Provider>
    </TabContext.Provider>
  </>
);
}

export default AppRoutes