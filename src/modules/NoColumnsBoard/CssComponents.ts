import { Stack, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { AppbarHeight } from '../../library/common/constants';
import { AppBtn } from '../../library/common/components';

export const CssBoard = styled(Stack)(({ theme }) => ({
   height: `calc(100vh - ${AppbarHeight.Xs} - ${theme.spacing(3)})`,
   width: '100%',
   justifyContent: 'center',
   alignItems: 'center',

   [theme.breakpoints.up('sm')]: {
      height: `calc(100vh - ${AppbarHeight.Sm} - ${theme.spacing(3)})`,
   },
}));

export const CssText = styled(Typography)({
   fontSize: '18px',
   color: '#828FA3',
   fontWeight: 700,
   marginBottom: '32px',
   textAlign: 'center',
});

export const CssColumnButton = styled(AppBtn)(({ theme }) => ({
   width: 'fit-content',
   padding: 'inherit 16px',
}));
CssColumnButton.defaultProps = {
   buttonSize: 'small',
   color: 'primary',
};
