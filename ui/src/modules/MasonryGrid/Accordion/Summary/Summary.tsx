import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import * as yup from 'yup';

import { CssTitleField, CssSummary } from '.';
import { CssDeleteIcon } from '../..';
import {
   getQueryNames,
   patchQueryNames,
   useAppDispatch,
   useAppSelector,
   useGetQuery,
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
import { ICategory } from '../../../AllBoards';

interface SubmitData {
   newCategory: string;
}

export const Summary = ({ category }: { category: string }) => {
   const dispatch = useAppDispatch();
   const isEditMode = useAppSelector(selectEditMode);

   const getDataType = getQueryNames.categories;
   const { isLoading, data } = useGetQuery<ICategory[]>(getDataType);

   const queryClient = useQueryClient();
   const dataType = patchQueryNames.renameCategory;
   const query = usePatchQuery<SubmitData, void>(dataType, category);
   const renameCategory = async (newCategory: SubmitData) => {
      await query.mutateAsync(newCategory, {
         onSuccess: (data) => {
            queryClient.invalidateQueries(['boards', 'by-categories'], {
               exact: true,
            });
         },
      });
   };

   const error = query.error as Error;

   const schema = yup.object().shape({
      category: yup
         .string()
         .trim()
         .required("Can't be empty")
         .matches(symbolsRegex, symbolsMessage)
         .min(2, 'Too short!')
         .max(40, 'Too long!')
         .test('unique-category', 'Category already exists', function (value) {
            return !data?.find(
               (item) =>
                  item.category.toLowerCase() === value?.toLowerCase() &&
                  item.category.toLowerCase() !== category.toLowerCase(),
            );
         }),
   });

   return (
      <CssSummary expandIcon={<ExpandMoreIcon />}>
         <Formik
            initialValues={{ category }}
            onSubmit={({ category }) =>
               renameCategory({ newCategory: category })
            }
            validationSchema={schema}
            enableReinitialize
         >
            {(props) => {
               const {
                  submitForm,
                  handleChange,
                  values: { category },
                  handleBlur,
                  touched,
                  errors,
                  dirty,
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
                           if (dirty) {
                              handleBlur(e);
                              submitForm();
                           }
                        }}
                        error={
                           touched.category && (!!errors.category || !!error)
                        }
                        helperText={
                           touched.category &&
                           (errors.category || error?.message)
                        }
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
