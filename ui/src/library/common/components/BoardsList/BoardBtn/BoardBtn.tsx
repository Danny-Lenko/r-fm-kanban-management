import { ListItem, ListItemIcon, ListItemText, SvgIcon } from '@mui/material';

import { useAppSelector } from '../../../hooks';
import { CssListButton } from '.';
import { ReactComponent as IconBoard } from '../../../../../resources/assets/icon-board.svg';
import { selectActiveBoard } from '../../../../../main/store';

interface Props {
   props: {
      name: string;
      path: string | null;
      btnClick: () => void;
   };
}

export const BoardBtn: React.FC<Props> = ({
   props: { name, path, btnClick },
}) => {
   const { path: activePath } = useAppSelector(selectActiveBoard);

   const isSelected = activePath === path;
   const label = path ? 'board' : 'create';

   return (
      <ListItem disablePadding>
         <CssListButton
            onClick={btnClick}
            aria-selected={isSelected}
            aria-label={label}
         >
            <ListItemIcon>
               <SvgIcon component={IconBoard} />
            </ListItemIcon>
            <ListItemText primary={name} />
         </CssListButton>
      </ListItem>
   );
};
