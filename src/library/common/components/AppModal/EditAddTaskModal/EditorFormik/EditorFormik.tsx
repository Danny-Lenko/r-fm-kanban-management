import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { useFormikValues, Values } from '.';

type FormikValues = FormikProps<Values>;

type Props = {
   children: (props: FormikValues) => React.ReactNode;
};

const schema = Yup.object().shape({
   title: Yup.string().trim().required("Can't be empty"),
   description: Yup.string().trim(),
   subtasks: Yup.array().of(Yup.string().trim().required("Can't be empty")),
});

export const EditorFormik: React.FC<Props> = ({ children }) => {
   const { initialValues, submit } = useFormikValues();

   return (
      <Formik
         initialValues={initialValues}
         validationSchema={schema}
         onSubmit={(values) => submit(values)}
      >
         {children}
      </Formik>
   );
};
