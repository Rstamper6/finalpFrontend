import * as React from 'react';
import Board from '../models/GraveBook';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import BoardsRoute from '../routes/BoardsRoute';
import { BoardPostsRoute } from '../routes/BoardPostsRoute';

export interface IBoardsProps {
    boards:Board[]
}

export function BoardsList (props: IBoardsProps) {
  const [id, setId] = useState()

  function captureId( x: any){

    console.log(x);
    <>
      <BoardPostsRoute />
    </>

    
    
  }
  return (
    <div>
      {
        props.boards.map(board => 
            <div key={board._id}>
                <img className='cardImg' src={board.img}></img>
                <h3 className='cardName'>{board.name}</h3>
                <div className='birth-death-div'>
                    <h5 className='cardDobDod'>{`${board.dob} -`}</h5>
                    <h5 className='cardDobDod'>{`${board.dod}`}</h5>
                </div>
                <Link onClick={() => captureId(board._id)} to={`/boards/${board._id}`}>View Board</Link>
                <button onClick={() => captureId(board._id)} className='viewButton'>View Board</button>
            </div>
        )
      }
    </div>
  );
}
