import * as Yup from 'yup';

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

export const editTaskSchema = Yup.object().shape({
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
