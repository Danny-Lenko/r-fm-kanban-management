import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useAppSelector } from '../../../../../hooks';
import { selectActiveCategoryName } from '../../../../../../../main/store';

const schemaBoard = Yup.object().shape({
   name: Yup.string().trim().required("Can't be empty"),
   columns: Yup.array().of(
      Yup.object().shape({
         name: Yup.string().trim().required("Can't be empty"),
      }),
   ),
});

const initialValues = {
   name: '',
   category: '',
   columns: [{ name: '' }, { name: '' }],
};

type CreateColumn = {
   name: string;
};

type CreateValues = {
   name: string;
   category: string;
   columns: CreateColumn[];
};

type FormikValues = FormikProps<CreateValues>;

type Props = {
   saveChanges: (values: CreateValues) => Promise<void>;
   children: (props: FormikValues) => React.ReactNode;
};

export const FormikCreate: React.FC<Props> = ({ children, saveChanges }) => {
   const category = useAppSelector(selectActiveCategoryName);

   const createBoard = async (values: CreateValues) => {
      const { name, columns } = values;

      const submitColumns = columns.map((column) => ({
         name: column.name,
      }));

      const submitValues = {
         name,
         category,
         columns: submitColumns,
      };

      await saveChanges(submitValues);
   };

   return (
      <Formik
         initialValues={initialValues}
         validationSchema={schemaBoard}
         onSubmit={(values) => createBoard(values)}
         enableReinitialize
      >
         {children}
      </Formik>
   );
};
