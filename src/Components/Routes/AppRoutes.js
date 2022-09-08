import {Routes,Route} from 'react-router-dom';
import { createContext, useState, useContext} from 'react';

import Tabs from 'Components/Tabs/Tabs'; 
import ErrorPage from 'Components/Pages/ErrorPage/ErrorPage';
import SingleCategories from 'Components/Pages/SingleCategories/SingleCategories';

import {HOME, CATEGORIES, HOMECATEGORIESMEAL, NOTFOUND} from "Components/Routes/RoutePaths/RoutePaths"

export const TabContext = createContext(null)

 
function AppRoutes (){ 
	const [ tabContext, setTabContext ] = useState([]);

return (
  <>
    <TabContext.Provider value={{ tabContext, setTabContext }}>
          <Routes>
            <Route path={HOME} element={<Tabs />} />
            <Route path={CATEGORIES} element={<Tabs />} />
            <Route path={CATEGORIES + "/:selectedPath"} element={<Tabs />} />
            <Route path={CATEGORIES + "/:selectedPath" + "/:mealPath"} element={<SingleCategories />}   />
            <Route path={NOTFOUND} element={<ErrorPage />} />
          </Routes>
    </TabContext.Provider>
  </>
);
}

export default AppRoutes