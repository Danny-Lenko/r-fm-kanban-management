import { AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { CssDeleteIcon } from '../..';
import {
   useAppDispatch,
   useAppSelector,
} from '../../../../library/common/hooks';
import {
   selectEditMode,
   setActiveCategoryName,
   setDeleteModalMode,
} from '../../../../main/store';

export const Summary = ({ category }: { category: string }) => {
   const dispatch = useAppDispatch();
   const isEditMode = useAppSelector(selectEditMode);

   return (
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
         <Typography>{category}</Typography>
         {isEditMode && (
            <CssDeleteIcon
               fontSize='medium'
               onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setDeleteModalMode('category'));
                  dispatch(setActiveCategoryName(category as string));
               }}
            />
         )}
      </AccordionSummary>
   );
};
