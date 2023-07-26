import * as Yup from 'yup';

export const schema = Yup.object().shape({
   title: Yup.string().trim().required("Can't be empty"),
   description: Yup.string().trim(),
   subtasks: Yup.array().of(Yup.string().trim().required("Can't be empty")),
});
