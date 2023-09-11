import { Stack } from '@mui/material';
import { FieldArray, FieldArrayRenderProps, FormikValues } from 'formik';

import { AppBtn, CssLabel } from '../../..';
import { Column } from '.';

export const ColumnFields: React.FC<FormikValues> = ({ values }) => {
   const addColumn = (arr: FieldArrayRenderProps) => {
      arr.push('');
   };

   return (
      <>
         <CssLabel children='Columns' />

         <FieldArray
            name='columns'
            render={(arrayHelpers) => (
               <Stack gap={1.5}>
                  {values.columns.map((_: string, index: number) => (
                     <Column
                        key={index}
                        arrayHelpers={arrayHelpers}
                        index={index}
                     />
                  ))}
                  <AppBtn
                     onClick={() => addColumn(arrayHelpers)}
                     buttonSize='small'
                     color='secondary'
                  >
                     + Add New Column
                  </AppBtn>
               </Stack>
            )}
         />
      </>
   );
};
