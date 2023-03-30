import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BoardPost } from '../models/GraveBook';
import { fetchBoard } from '../services/gravebookServices';
import '../css/UserData.css'


export interface IUserInfoProps {
  userData: BoardPost[]
}

export function UserInfo (props: IUserInfoProps) {

  function sendToBoard(boardId: string){
    <Link to={`/boardposts/${boardId}`}></Link>
  }

  return(
    <div className='user-data'>
      {props.userData.map((data) => (
        <div className='user-posts-info'>
          <p className='post-board-id'>Board ID: {data.boardId}</p>
          <p className='post-board-text'>Text: {data.text}</p>
          <Link to={`/boards/${data.boardId}`}>View</Link>
        </div>
      ))}
    </div>
  )
}
