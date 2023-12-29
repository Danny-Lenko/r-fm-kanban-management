import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { CssTitleField, CssSummary } from '.';
import { CssDeleteIcon } from '../..';
import {
   patchQueryNames,
   useAppDispatch,
   useAppSelector,
   usePatchQuery,
} from '../../../../library/common/hooks';
import {
   selectEditMode,
   setActiveCategoryName,
   setDeleteModalMode,
} from '../../../../main/store';
import {
   symbolsMessage,
   symbolsRegex,
} from '../../../../library/common/constants';
import { useQueryClient } from '@tanstack/react-query';

const schema = yup.object().shape({
   category: yup
      .string()
      .trim()
      .required("Can't be empty")
      .matches(symbolsRegex, symbolsMessage)
      .min(2, 'Too short!')
      .max(40, 'Too long!'),
});

interface SubmitData {
   newCategory: string;
}

export const Summary = ({ category }: { category: string }) => {
   const dispatch = useAppDispatch();
   const isEditMode = useAppSelector(selectEditMode);

   const queryClient = useQueryClient();
   const dataType = patchQueryNames.renameCategory;
   const query = usePatchQuery<SubmitData, void>(dataType, category);
   const renameCategory = async (newCategory: SubmitData) => {
      await query.mutateAsync(newCategory, {
         onSuccess: (data) => {
            queryClient.invalidateQueries(['boards'], { exact: true });
         },
      });
   };

   return (
      <CssSummary expandIcon={<ExpandMoreIcon />}>
         <Formik
            initialValues={{ category }}
            onSubmit={({ category }) =>
               renameCategory({ newCategory: category })
            }
            validationSchema={schema}
         >
            {(props) => {
               const {
                  submitForm,
                  handleChange,
                  values: { category },
                  handleBlur,
                  touched,
                  errors,
               } = props;
               return (
                  <Form>
                     <CssTitleField
                        onChange={handleChange}
                        value={category}
                        id='category'
                        name='category'
                        onClick={(e) => {
                           if (isEditMode) {
                              e.stopPropagation();
                           }
                        }}
                        onBlur={(e) => {
                           handleBlur(e);
                           submitForm();
                        }}
                        error={touched.category && !!errors.category}
                        helperText={touched.category && errors.category}
                        isEditMode={isEditMode}
                     />
                  </Form>
               );
            }}
         </Formik>
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
      </CssSummary>
   );
};
