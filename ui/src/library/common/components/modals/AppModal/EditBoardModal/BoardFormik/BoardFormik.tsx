import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { useBoardFormik, BoardValues } from '.';

export const schemaBoard = Yup.object().shape({
   name: Yup.string().trim().required("Can't be empty"),
   columns: Yup.array().of(
      Yup.object().shape({
         id: Yup.string().optional(),
         name: Yup.string().trim().required("Can't be empty"),
      }),
   ),
});

type FormikValues = FormikProps<BoardValues>;
type SubmitColumn = {
   id: string;
   name: string;
};
type SubmitValues = {
   name: string;
   columns: SubmitColumn[];
};

type Props = {
   saveChanges: (values: SubmitValues) => void;
   children: (props: FormikValues) => React.ReactNode;
};

export const BoardFormik: React.FC<Props> = ({ children, saveChanges }) => {
   const { initialValues } = useBoardFormik();

   const submit = (values: BoardValues) => {
      const { name, columns } = values;

      const submitColumns = columns.map((column) => ({
         id: column.id,
         name: column.name,
      }));
      const submitValues = {
         name,
         columns: submitColumns,
      };

      saveChanges(submitValues);
   };

   return (
      <Formik
         initialValues={initialValues}
         validationSchema={schemaBoard}
         onSubmit={(values) => submit(values)}
         enableReinitialize
      >
         {children}
      </Formik>
   );
};
