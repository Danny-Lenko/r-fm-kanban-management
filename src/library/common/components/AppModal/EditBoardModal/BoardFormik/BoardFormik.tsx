import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { useBoardFormik, BoardValues } from '.';

export const schemaBoard = Yup.object().shape({
   name: Yup.string().trim().required("Can't be empty"),
   columns: Yup.array().of(Yup.string().trim().required("Can't be empty")),
});

type FormikValues = FormikProps<BoardValues>;

type Props = {
   children: (props: FormikValues) => React.ReactNode;
};

export const BoardFormik: React.FC<Props> = ({ children }) => {
   const { initialValues, submit } = useBoardFormik();

   return (
      <Formik
         initialValues={initialValues}
         validationSchema={schemaBoard}
         onSubmit={(values) => submit(values)}
      >
         {children}
      </Formik>
   );
};
