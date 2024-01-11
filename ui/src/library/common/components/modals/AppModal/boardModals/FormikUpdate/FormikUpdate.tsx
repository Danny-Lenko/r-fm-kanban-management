import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { useFormikUpdate } from '.';

export const schemaBoard = Yup.object().shape({
   name: Yup.string().trim().required("Can't be empty"),
   columns: Yup.array().of(
      Yup.object().shape({
         id: Yup.string().optional(),
         name: Yup.string().trim().required("Can't be empty"),
      }),
   ),
});

type UpdateColumn = {
   id: string;
   name: string;
};

type UpdateValues = {
   name: string;
   columns: UpdateColumn[];
};

type FormikValues = FormikProps<UpdateValues>;

type Props = {
   saveChanges: (values: UpdateValues) => void;
   children: (props: FormikValues) => React.ReactNode;
};

export const FormikUpdate: React.FC<Props> = ({ children, saveChanges }) => {
   const { initialValues } = useFormikUpdate();

   const updateBoard = (values: UpdateValues) => {
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
         onSubmit={updateBoard}
         enableReinitialize
      >
         {children}
      </Formik>
   );
};

