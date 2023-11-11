import { MenuItem } from '@mui/material';
import { FormikValues } from 'formik';
import { ClickAwayListener } from '@mui/base';

import { CssLabel } from '../../AppModal';
import { AppSelect } from '../../..';
import { useState } from 'react';

interface Props extends FormikValues {
   columnOptions: string[];
}

export const EditorSelect: React.FC<Props> = ({
   values,
   handleChange,
   columnOptions,
}) => {
   const [isSelectOpen, setIsSelectOpen] = useState(false);

   const toggleMenu = () => {
      setIsSelectOpen((prev) => !prev);
   };

   const handleClose = () => {
      setIsSelectOpen(false);
   };

   return (
      <>
         <CssLabel children='Status' htmlFor='status' />
         <AppSelect
            id='status'
            name='status'
            value={values.status}
            MenuProps={selectMenuStyles}
            open={isSelectOpen}
            onChange={handleChange}
            onClick={toggleMenu}
         >
            {columnOptions.map((option: string) => (
               <MenuItem key={option} value={option}>
                  <ClickAwayListener onClickAway={handleClose}>
                     <span>{option}</span>
                  </ClickAwayListener>
               </MenuItem>
            ))}
         </AppSelect>
      </>
   );
};

const selectMenuStyles = {
   sx: {
      position: 'static',
   },
   PaperProps: {
      sx: {
         zIndex: 20000,
      },
   },
};
