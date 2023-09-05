import { ITask } from '../../../library/interfaces/interfaces';
import { useAppDispatch } from '../../../library/common/hooks';
import {
   setActiveColumndId,
   setActiveTaskId,
} from '../../../main/store/data/dataSlice';
import { setTaskManaging } from '../../../main/store/modals/modalSlice';

import { CssCard, CssTitle, CssSubtasks } from '.';

interface Props extends ITask {
   columnId: string;
}

export const TaskCard: React.FC<Props> = ({
   title,
   completedSubtasks,
   subtasks,
   id,
   columnId,
}) => {
   const dispatch = useAppDispatch();

   const handleClick = () => {
      dispatch(setActiveColumndId(columnId));
      dispatch(setActiveTaskId(id));
      dispatch(setTaskManaging(true));
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
