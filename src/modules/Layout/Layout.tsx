import { AppDrawer, AppBar, CssLayout } from '.';

type Props = {
   children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
   return (
      <CssLayout>
         <AppBar />
         <AppDrawer />

         {children}
      </CssLayout>
   );
};
