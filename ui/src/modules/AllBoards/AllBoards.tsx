import { Link, Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { Tab } from '@mui/material';

import { useGetQuery, dataTypeNames } from '../../library/common/hooks';
import { CssContainer, useRouteMatch, CssTabs, CssUnderline } from '.';

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
   const categories = dataTypeNames.categories;
   const { isLoading, error, data } = useGetQuery<ICategory[]>(categories);

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
