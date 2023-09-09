import { useDispatch } from 'react-redux';
import { dropColumn, dropTask } from '../../../main/store';
import { OnDragEndResponder } from 'react-beautiful-dnd';

export const useDragDrop = () => {
   const dispatch = useDispatch();

   const handleDragDrop: OnDragEndResponder = (results) => {
      const { source, destination, type } = results;

      if (!destination) return;

      if (
         source.droppableId === destination.droppableId &&
         source.index === destination.index
      )
         return;

      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      const sourceColumnId = source.droppableId;
      const destinationColumnId = destination.droppableId;
      const indexes = { sourceIndex, destinationIndex };
      const info = { ...indexes, sourceColumnId, destinationColumnId };

      if (type === 'columns') {
         dispatch(dropColumn(indexes));
      }

      if (type === 'tasks') {
         dispatch(dropTask(info));
      }

      console.log(results);
   };

   return { handleDragDrop };
};
