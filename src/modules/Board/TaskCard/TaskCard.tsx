import { ITask } from '../../../library/interfaces/interfaces';
import { useAppDispatch } from '../../../library/common/hooks';
import { assignActiveTaskCol } from '../../../main/slices/dataSlice';
import { setTaskManaging } from '../../../main/slices/modalSlice';

import { CssCard, CssTitle, CssSubtasks } from '.';

export const TaskCard: React.FC<ITask> = (task) => {
   const { title, completedSubtasks, subtasks } = task;

   const dispatch = useAppDispatch();

   const handleClick = () => {
      dispatch(setTaskManaging(true));
      dispatch(assignActiveTaskCol(task));
   };

   return (
      <CssCard onClick={handleClick}>
         <CssTitle>{title}</CssTitle>
         <CssSubtasks>
            {completedSubtasks} of {subtasks.length} subtasks
         </CssSubtasks>
      </CssCard>
   );
};
