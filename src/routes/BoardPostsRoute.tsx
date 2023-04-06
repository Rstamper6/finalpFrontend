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
import _ from "lodash";



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
        // setPaginatedPost(_(boardPosts).slice(0).take(pageSize).value())

      }, [click === true])

      const pageSize = 8;
      const pageCount = Math.ceil(boardPosts.length / pageSize);
      const [currentPage, setCurrentPage] = useState(1)
      const [paginatedPost, setPaginatedPost] = useState<Board[]>([]);
      useEffect(() => {
        fetchBoardPosts(id).then(setBoardPosts)
        setClick(false)

        setPaginatedPost(_(boardPosts).slice(0).take(pageSize).value())
      }, [pageCount]);
    
      // if (pageCount === 1) return null;
      const pages = _.range(1, pageCount + 1);
    
      const pagination = (pageNo:number) => {
        setCurrentPage(pageNo)
        const startIndex = (pageNo - 1)* pageSize;
        const paginatedPost = _(boardPosts).slice(startIndex).take(pageSize).value()
        setPaginatedPost(paginatedPost)
      }
 
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
              <PostForm boardId={id} onClick={setClick} click={click} />
              :
              <h5>Sign in to Add a post</h5>
            }
        </div>

      }
      {
        boardPosts !== undefined &&
        <div className='posts-div'>
          <Posts  posts={boardPosts} paginatedPost={paginatedPost} pages={pages} pagination={pagination} currentPage={currentPage} />
          {/*  */}
        </div>
      }
            <nav className="paginationContainer">
        <ul className="pagination">
          {pages.map((page) => (
            <li className={
              page === currentPage? "page-item active"  : "page-item"
            }
            >
              <p className="page-link"
              onClick={() => pagination(page) }>{page}</p>
              </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
