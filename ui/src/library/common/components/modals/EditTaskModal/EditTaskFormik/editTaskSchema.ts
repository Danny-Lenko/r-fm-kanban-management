import * as Yup from 'yup';

interface ISubtask {
   id?: string;
   title?: string;
   isCompleted?: boolean;
}

const validateUniqueSubtasks = (subtasks: ISubtask[] | undefined) => {
   if (!subtasks) {
      return true;
   }
   const seen = new Set();

   subtasks.forEach((subtask, i) => {
      if (seen.has(subtask.title)) {
         throw new Yup.ValidationError(
            'Subtask must be unique',
            subtask.title,
            `subtasks[${i}].title`,
         );
      } else {
         seen.add(subtask.title);
      }
   });

   return true;
};

export const editTaskSchema = Yup.object().shape({
   title: Yup.string().trim().required("Can't be empty"),
   description: Yup.string().trim(),
   subtasks: Yup.array()
      .of(
         Yup.object().shape({
            id: Yup.string().required(),
            title: Yup.string().trim().required("Can't be empty"),
            isCompleted: Yup.boolean(),
         }),
      )
      .test(
         'unique-subtasks',
         'Subtasks must be unique',
         validateUniqueSubtasks,
      ),
});
