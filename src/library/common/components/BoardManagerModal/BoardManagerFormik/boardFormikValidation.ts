import * as Yup from 'yup';

export const schema = Yup.object().shape({
   name: Yup
      .string()
      .trim()
      .required("Can't be empty"),
   columns: Yup.array().of(
      Yup.string().trim().required("Can't be empty")
   )
});