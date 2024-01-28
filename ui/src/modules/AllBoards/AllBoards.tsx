import { Link, Outlet, useOutletContext } from 'react-router-dom';
import { Tab } from '@mui/material';

import { useGetQuery, getQueryNames } from '../../library/common/hooks';
import { CssContainer, useRouteMatch, CssTabs, CssUnderline } from '.';

import { IBoard } from '../../library/interfaces/interfaces';

// https://mui.com/material-ui/guides/routing/#tabs
function ViewTabs() {
   const routeMatch = useRouteMatch(['/', '/categories-grid']);
   const currentTab = routeMatch?.pattern?.path;

   const tabSx = {
      textTransform: 'unset',
   };

   return (
      <>
         <CssTabs value={currentTab}>
            <Tab
               sx={tabSx}
               label={currentTab === '/' ? 'Backlog' : 'View as Backlog'}
               value='/'
               to='/'
               component={Link}
            />
            <Tab
               sx={tabSx}
               value='/categories-grid'
               to='/categories-grid'
               component={Link}
               label={
                  currentTab === '/categories-grid' ? 'Grid' : 'View as Grid'
               }
            />
         </CssTabs>
         <CssUnderline />
      </>
   );
}

export interface ICategory {
   category: string;
   boards: IBoard[];
}

export const AllBoards = () => {
   const categories = getQueryNames.categories;
   const { isLoading, data } = useGetQuery<ICategory[]>(categories);

   if (isLoading) return <h1>...Loading</h1>;

   return (
      <CssContainer>
         <ViewTabs />
         <Outlet context={data} />
      </CssContainer>
   );
};

export function useCategories() {
   return useOutletContext<ICategory[]>();
}
