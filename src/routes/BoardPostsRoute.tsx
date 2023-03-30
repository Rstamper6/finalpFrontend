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
import AuthContext from '../context/AuthContext';


export function BoardPostsRoute () {
  const { user } = useContext(AuthContext)

    const [board, setBoard] = useState<Board>()
    const [boardPosts, setBoardPosts] = useState([])
    const { boards} = useContext(BoardContext)
    const [boardId, setId] = useState('')
    const [click, setClick] = useState(false)

    //grabs the id from the parameters in the URL
    let { id } = useParams();
    //searches the boards context for the id that matches the id parameter
    let item = boards.find((item) => item._id === id)


    //fetches the board based on the ID and sets it to the board state
    //also sets the id as long as item._id is not undefined 
      useEffect(() => {
        fetchBoard(id).then(setBoard)
        fetchBoardPosts(id).then(setBoardPosts)
        if(user?.uid){
          console.log(user.uid);
          
        }
      }, [])

      useEffect(() =>{
        fetchBoardPosts(id).then(setBoardPosts)
        setClick(false)
      }, [click === true])
 
  return (
    <div className='boardPostsRoute'>
      {
        //displays the board and posts as long as they are not undefined
        board !== undefined &&
        <div className='route'>
            <div className='name-img-div'>
              <BoardPosts board={board} posts={boardPosts} />
            </div>
            {user ?
              <PostForm boardId={id} onClick={setClick} click={click}/>
              :
              <h5>Sign in to Add a post</h5>
            }
        </div>

      }
      {
        boardPosts !== undefined &&
        <div className='posts-div'>
          <Posts  posts={boardPosts}/>
        </div>
      }
    </div>
  );
}
