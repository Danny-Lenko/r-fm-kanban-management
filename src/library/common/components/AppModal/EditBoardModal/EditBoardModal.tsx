import { useAppSelector } from '../../../hooks';
import Typography from '@mui/material/Typography';
import { Form } from 'formik';
import { BoardFormik } from './BoardFormik';
import NameField from './NameField/NameField';
import ColumnsFieldArr from './BoardColumnsFieldArr/BoardColumnsFieldArr';

import { AppBtn } from '../../AppBtn';
import { boardManagerStyles, btnSx } from './boardManagerStyles';

export const EditBoardModal: React.FC = () => {
   const isExisting = useAppSelector((state) => state.modals.isExistingBoard);

   return (
      <>
         <Typography variant='h3'>
            {isExisting ? 'Edit board' : 'Add new board'}
         </Typography>

         <BoardFormik>
            {(props) => (
               <Form>
                  <NameField
                     {...props}
                     // value={props.values.name}
                     // onChange={props.handleChange}
                     // error={props.touched.name && Boolean(props.errors.name)}
                     // helperText={props.touched.name && props.errors.name}
                  />

                  <ColumnsFieldArr
                     columns={props.values.columns}
                     value={props.values.columns}
                     onChange={props.handleChange}
                     tochedColumns={props.touched.columns}
                     errorsColumns={props.errors.columns}
                  />

                  <AppBtn
                     sx={btnSx}
                     type='submit'
                     buttonSize='small'
                     color='primary'
                  >
                     {isExisting ? 'Save Changes' : 'Create New Board'}
                  </AppBtn>
               </Form>
            )}
         </BoardFormik>
      </>
   );
};
