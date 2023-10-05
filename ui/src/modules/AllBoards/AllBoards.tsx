import { Link, Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { Tab } from '@mui/material';

import { useGetData } from '../../library/common/hooks';
import { CssContainer, useRouteMatch, CssTabs, CssUnderline } from '.';

import { getDataTypes } from '../../library/common/hooks';
import { IBoard } from '../../library/interfaces/interfaces';

// https://mui.com/material-ui/guides/routing/#tabs
function ViewTabs() {
   const routeMatch = useRouteMatch(['/', '/backlog']);
   const currentTab = routeMatch?.pattern?.path;

   const navigate = useNavigate();

   const tabSx = {
      textTransform: 'unset',
   };

   return (
      <>
         <CssTabs value={currentTab}>
            <Tab
               sx={tabSx}
               label={currentTab === '/' ? 'Grid' : 'View as Grid'}
               value='/'
               to='/'
               component={Link}
            />
            <Tab
               sx={tabSx}
               value='/backlog'
               to='/backlog'
               component={Link}
               label={currentTab === '/backlog' ? 'Backlog' : 'View as Backlog'}
            />
            {/* <button onClick={() => navigate('/my-board')}>Go To a Board</button> */}
         </CssTabs>
         <CssUnderline />
      </>
   );
}

interface ICategory {
   category: string;
   boards: IBoard[];
}

export const AllBoards = () => {
   const { categories } = getDataTypes;
   const categoriesType = categories.name;

   const { isLoading, error, data } = useGetData<ICategory[]>(
      categoriesType as keyof typeof getDataTypes,
   );

   // if (data) {
   //    console.log(data);
   // }

   if (isLoading) return <h1>...Loading</h1>;

   return (
      <>
         <CssContainer>
            <ViewTabs />
            <Outlet context={data} />
         </CssContainer>
      </>
   );
};

export function useCategories() {
   return useOutletContext<ICategory[]>();
}
