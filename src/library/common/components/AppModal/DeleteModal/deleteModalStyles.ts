import { styled } from '@mui/system';
import { AppBtn, Props } from '../../AppBtn';

export const DeleteBtn = styled(AppBtn)<Props>(({ theme }) => ({
   backgroundColor: theme.palette.destructCustom.main,
}));
