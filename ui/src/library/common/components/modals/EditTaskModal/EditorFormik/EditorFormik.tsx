import { useState, useEffect } from 'react';

import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { useFormikValues, Values } from '.';
import { selectActiveTaskId } from '../../../../../../main/store/data/dataSelectors';

import { useAppSelector, dataTypeNames, useGetQuery } from '../../../../hooks';
import { ITask } from '../../../../../interfaces';

type FormikValues = FormikProps<Values>;

type Props = {
   children: (props: FormikValues) => React.ReactNode;
};

const validateUniqueSubtasks = (values: (string | undefined)[] | undefined) => {
   if (!values) {
      return true;
   }
   const seen = new Set();

   values.forEach((value, i) => {
      if (seen.has(value)) {
         throw new Yup.ValidationError(
            'Subtask must be unique',
            values[i],
            `subtasks[${i}]`,
         );
      } else {
         seen.add(value);
      }
   });

   return true;
};

const schema = Yup.object().shape({
   title: Yup.string().trim().required("Can't be empty"),
   description: Yup.string().trim(),
   subtasks: Yup.array()
      .of(Yup.string().trim().required("Can't be empty"))
      .test(
         'unique-subtasks',
         'Subtasks must be unique',
         validateUniqueSubtasks,
      ),
});

export const EditorFormik: React.FC<Props> = ({ children }) => {
   // const { initialValues, submit } = useFormikValues();

   // const { isLoading, error, data } = useGetQuery<ITask>(taskById, id, {
   //    staleTime: 60000,
   // });

   // const [initialValues, setInitialValues] = useState({});



   // console.log(initialValues);




   const submit = (values: Values) => {};

   return (
      <>Hello</>
   );
};
