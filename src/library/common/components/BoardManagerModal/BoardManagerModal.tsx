import { useTheme } from '@mui/material/styles';
import { boardManagerStyles } from './boardManagerStyles';
import { useAppSelector } from '../../hooks';
import Overlay from '../Overlay/Overlay';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CustomBtn from '../AppBtn';
import { Form } from 'formik';
import BoardManagerFormik from './BoardManagerFormik/BoardManagerFormik';
import NameField from './BoardNameField/BoardNameField';
import ColumnsFieldArr from './BoardColumnsFieldArr/BoardColumnsFieldArr';

const BoardManagerModal = () => {
   const theme = useTheme();
   const isExisting = useAppSelector((state) => state.modals.isExistingBoard);

   return (
      <Overlay>
         <Paper elevation={0} sx={boardManagerStyles(theme)}>
            <Typography variant='h3'>
               {isExisting ? 'Edit board' : 'Add new board'}
            </Typography>

            <BoardManagerFormik>
               {(props: any) => (
                  <Form>
                     <NameField
                        value={props.values.name}
                        onChange={props.handleChange}
                        error={props.touched.name && Boolean(props.errors.name)}
                        helperText={props.touched.name && props.errors.name}
                     />

                     <ColumnsFieldArr
                        columns={props.values.columns}
                        value={props.values.columns}
                        onChange={props.handleChange}
                        tochedColumns={props.touched.columns}
                        errorsColumns={props.errors.columns}
                     />

                     <CustomBtn
                        type='submit'
                        sizeSm={true}
                        color='primary'
                        text={isExisting ? 'Save Changes' : 'Create New Board'}
                        styles={{ width: '100%', mt: 4 }}
                     />
                  </Form>
               )}
            </BoardManagerFormik>
         </Paper>
      </Overlay>
   );
};

export default BoardManagerModal;
