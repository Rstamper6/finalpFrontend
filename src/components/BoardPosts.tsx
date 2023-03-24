import { Button, Label, Input } from 'reactstrap';
import Board from '../models/GraveBook';
import { BoardPost } from '../models/GraveBook';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { addBoardPost, fetchBoardPosts } from '../services/gravebookServices';
import "../css/Board.css"



export interface IBoardPostsProps {
    board: Board,
    posts: BoardPost[]
}

export function BoardPosts (props: IBoardPostsProps) {
  const [boardId, setId] = useState('')


  //if the board id passed through props is defined, set the id to that value
  useEffect(() =>{
    if(props.board._id){
      setId(props.board._id)
    } 
  }, [])

  return (
    <div className='boardPosts'>
      <div className='Board-Image'>
      <img src={props.board.img}></img>
      </div>

        <div className='Board-Info'>
          <div className='Title'>
              <h3 className='board-name'>{props.board.name}</h3>
              <h5 className='board-bob-dod'>{props.board.dob} - {props.board.dod}</h5>
              <p className='Board-Paragraph'>{props.board.obituary}</p>
          </div>
        </div>
        
    </div>
  );
}