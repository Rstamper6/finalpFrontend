import * as React from 'react';
import Board from '../models/GraveBook';
import { useState, useEffect, useContext } from 'react';
import { fetchBoard, fetchBoardPosts } from '../services/gravebookServices';
import { BoardPosts } from '../components/BoardPosts';
import { useParams } from 'react-router-dom';
import BoardContext from '../context/BoardContext';
import { BoardPost } from '../models/GraveBook';



export function BoardPostsRoute () {
    const [board, setBoard] = useState<Board>()
    const [boardPosts, setBoardPosts] = useState([])
    const { boards} = useContext(BoardContext)
    const [boardId, setId] = useState('')


    let { id } = useParams();
  
    let item = boards.find((item) => item._id === id)

    useEffect(loadBoard, [])

    useEffect(loadPosts, [])
    useEffect(idek, [boardId !== ''])

    function loadBoard(){
      fetchBoard(item?._id).then(setBoard)
    }
    function loadPosts(){
      if(item?._id){
        setId(item?._id)
        console.log(boardId);
      }
    }
    function idek(){
      fetchBoardPosts(boardId).then(setBoardPosts)
      console.log(boardPosts);

    }
  return (
    <div>
      {
        board && boardPosts !== undefined &&
        <BoardPosts board={board} posts={boardPosts} />
      }
    </div>
  );
}
