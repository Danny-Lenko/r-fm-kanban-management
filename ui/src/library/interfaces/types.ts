interface Subtask {}

export type SubmitValues = {
   title: string;
   description: string;
   subtasks: Subtask[];
   status: string;
};
