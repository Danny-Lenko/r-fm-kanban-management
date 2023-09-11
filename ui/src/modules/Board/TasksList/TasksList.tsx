import { Droppable, Draggable } from 'react-beautiful-dnd';

import { CssList, TaskCard } from '.';

import { ITask } from '../../../library/interfaces';

interface Props {
   columnId: string;
   tasks: ITask[];
}

export const TasksList: React.FC<Props> = ({ columnId, tasks }) => {
   return (
      <Droppable droppableId={columnId} type='tasks'>
         {(provided) => (
            <CssList
               {...provided.droppableProps}
               ref={provided.innerRef}
               spacing={2.5}
            >
               {tasks.map((task, index) => (
                  <Draggable draggableId={task.id} index={index} key={task.id}>
                     {(provided) => (
                        <TaskCard
                           key={task.title}
                           {...{
                              ...task,
                              columnId,
                              provided,
                           }}
                        />
                     )}
                  </Draggable>
               ))}
               {provided.placeholder}
            </CssList>
         )}
      </Droppable>
   );
};
