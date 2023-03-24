import * as React from 'react';
import Board from '../models/GraveBook';
import { useState, useEffect, useContext } from 'react';
import { fetchBoard, fetchBoardPosts } from '../services/gravebookServices';
import { BoardPosts } from '../components/BoardPosts';
import { useParams } from 'react-router-dom';
import BoardContext from '../context/BoardContext';
import { PostForm } from '../components/AddPostForm';
import { Posts } from '../components/Posts';
import '../css/boardPostsRoute.css'


export function BoardPostsRoute () {
    const [board, setBoard] = useState<Board>()
    const [boardPosts, setBoardPosts] = useState([])
    const { boards} = useContext(BoardContext)
    const [boardId, setId] = useState('')

    //grabs the id from the parameters in the URL
    let { id } = useParams();
    //searches the boards context for the id that matches the id parameter
    let item = boards.find((item) => item._id === id)
    let idchecker = boardId !== ''

    //fetches the board based on the ID and sets it to the board state
    //also sets the id as long as item._id is not undefined 
    useEffect(() =>{
      fetchBoard(item?._id).then(setBoard)
        if(item?._id){
          setId(item?._id)
          // console.log(boardId);
        }
      }, [])

    //fetches the board posts once the boardId state changes
    useEffect(() =>{
      fetchBoardPosts(boardId).then(setBoardPosts)
    }, [idchecker])
    useEffect(() =>{
      fetchBoardPosts(boardId).then(setBoardPosts)
    }, [boardPosts])
 
  return (
    <div className='boardPostsRoute'>
      {
        //displays the board and posts as long as they are not undefined
        board && boardPosts !== undefined &&
        <div className='route'>
            <div className='name-img-div'>
              <BoardPosts board={board} posts={boardPosts} />
            </div>
            <PostForm boardId={id}/>

            <div className='posts-div'>
              <Posts  posts={boardPosts}/>
            </div>
        </div>

      }
    </div>
  );
}
