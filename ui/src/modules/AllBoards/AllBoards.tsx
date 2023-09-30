import { Link, Outlet } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';

import { useApi } from '../../library/common/hooks';
import { CssContainer, useRouteMatch, CssTabs, CssUnderline } from '.';

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

export const AllBoards = () => {
   const { data, loading, error } = useApi('/boards');

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
