import { Link, Outlet } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';

import { useGetData } from '../../library/common/hooks';
import { CssContainer, useRouteMatch, CssTabs, CssUnderline } from '.';

import { getDataTypes } from '../../library/common/hooks';
import { UseQueryResult } from '@tanstack/react-query';

// https://mui.com/material-ui/guides/routing/#tabs
function ViewTabs() {
   const routeMatch = useRouteMatch(['/', '/backlog']);
   const currentTab = routeMatch?.pattern?.path;

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
         </CssTabs>
         <CssUnderline />
      </>
   );
}

interface IBoard {
   name: string;
}

export const AllBoards = () => {
   const dataType = getDataTypes.boards.name;
   const { isLoading, error, data } = useGetData<IBoard>(
      dataType as keyof typeof getDataTypes,
   );

   if (data) {
      console.log(data);
   }

   return (
      <>
         <CssContainer>
            <ViewTabs />
            <Outlet />
         </CssContainer>
      </>
   );
};
