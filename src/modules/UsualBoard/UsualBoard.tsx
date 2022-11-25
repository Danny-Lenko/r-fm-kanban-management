import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../library/common/hooks/hooks';


const UsualBoard = () => {
   const params = useParams()
   const allBoards = useAppSelector(state => state.data.data)
   const currentBoard = params.name ? allBoards.find(board => board.path === params.name) : allBoards[0]

   console.log(currentBoard)

   return (  
      <h2>hello UsualBoard</h2>
   );
}
 
export default UsualBoard;