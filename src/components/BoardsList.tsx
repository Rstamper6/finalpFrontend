import Board from '../models/GraveBook';
import { Link } from 'react-router-dom';
import { BoardPostsRoute } from '../routes/BoardPostsRoute';
import { Card } from 'react-bootstrap';
import '../css/boardlist.css'


export interface IBoardsProps {
    boards:Board[]
}

export function BoardsList (props: IBoardsProps) {

  function captureId( x: any){

    console.log(x);
    <>
      <BoardPostsRoute />
    </>

    
    
  }
  return (
    <div className='BoardsList'>
      {
        props.boards.map(board => 
          <div key={board._id}>
              <div >
                <div className='Services-Cards'>
                  <Card className='Board-Card'>
                  {/* <Card.Img id='TapBox-Card-Image' variant="top" src={board.img} /> */}
                    <Card.Body>
                    <div className='board-image'>yo</div>
                    <div className='board-info'>
                      <h3>{board.name}</h3>
                      <p>{board.dob} - {board.dod}</p>
                      <Link onClick={() => captureId(board._id)} to={`/boards/${board._id}`}>View Board</Link>
                      {/* <button onClick={() => captureId(board._id)} className='viewButton'>View Board</button> */}
                    </div>
                    </Card.Body>
                  </Card>
                </div>
            </div>
          </div>
        )
      }
    </div>
  );
}
