import { styled } from '@mui/material/styles';
import { Paper, Tabs } from '@mui/material';

export const CssContainer = styled(Paper)(({ theme }) => ({
   margin: `0 -${theme.spacing(1)}`,
   borderRadius: '12px',
   boxShadow: 'unset',
}));

export const CssTabs = styled(Tabs)(({ theme }) => ({
   margin: `0 ${theme.spacing(3)}`,
}));

export const CssUnderline = styled('div')(({ theme }) => ({
   margin: `-2px ${theme.spacing(3)} 0`,
   height: '2px',
   backgroundColor: theme.palette.divider,
}));
