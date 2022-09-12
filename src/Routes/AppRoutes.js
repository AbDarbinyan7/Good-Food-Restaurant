import {Routes,Route} from 'react-router-dom';
import { createContext, useState, useContext} from 'react';

import Tabs from 'Components/Tabs/Tabs'; 
import ErrorPage from 'Components/Pages/ErrorPage/ErrorPage';
import SingleCategories from 'Components/Pages/SingleCategories/SingleCategories';
import CartPage from 'Components/Pages/CartPage/CartPage';
import Header from "Components/Header/Header";
import Footer from "Components/Footer/Footer";


import {HOME, CATEGORIES, HOMECATEGORIESMEAL, NOTFOUND, CART} from "Routes/RoutePaths/RoutePaths"

export const TabContext = createContext(null)
export const MealsArrContext = createContext([]);
export const CartContext = createContext([]);

function AppRoutes (){ 
	const [ tabContext, setTabContext ] = useState([]);
	const [cartContext, setCartContext] = useState([]);

return (
  <>
    <TabContext.Provider value={{ tabContext, setTabContext }}>
      <CartContext.Provider value={{ cartContext, setCartContext }}>
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
      </CartContext.Provider>
    </TabContext.Provider>
  </>
);
}

export default AppRoutes