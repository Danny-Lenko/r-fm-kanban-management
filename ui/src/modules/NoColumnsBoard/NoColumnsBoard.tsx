
import { CssBoard, CssText, CssColumnButton } from '.';

export const NoColumnsBoard = () => {
   const addCol = () => console.log('tempo');

   return (
      <CssBoard>
         <CssText>
            This board is empty. Create a new column to get started.
         </CssText>
         <CssColumnButton onClick={addCol}>+ Add New Column</CssColumnButton>
      </CssBoard>
   );
};
