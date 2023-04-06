import Board from "../models/GraveBook";
import { Link } from "react-router-dom";
import { BoardPostsRoute } from "../routes/BoardPostsRoute";
import { Card, Button } from "react-bootstrap";
import "../css/boardlist.css";
import { ReactNode, useState, useEffect } from 'react';
import _ from "lodash";


export interface IBoardsProps {
  boards: Board[];
}

export function BoardsList(props: IBoardsProps) {

  const pageSize = 5;
  const pageCount = Math.ceil(props?.boards.length / pageSize);
  const [currentPage, setCurrentPage] = useState(1)
  const [paginatedPost, setPaginatedPost] = useState<Board[]>([]);
  useEffect(() => {
    setPaginatedPost(_(props.boards).slice(0).take(pageSize).value())
  }, [pageCount]);
  
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo:number) => {
    setCurrentPage(pageNo)
    const startIndex = (pageNo - 1)* pageSize;
    const paginatedPost = _(props.boards).slice(startIndex).take(pageSize).value()
    setPaginatedPost(paginatedPost)
  }

  let user = props.boards.find((board) => board.user)
  
  return (
    <div className="BoardsList">
      {/* maps all of the board passed through the BoardProps */}
      {paginatedPost.map((board) => (
        <div className="theCard" key={board._id}>
          <Card>
            {/* <Card.Img id='TapBox-Card-Image' variant="top" src={board.img} /> */}
            <Card.Body>
              <div className="board-image">
                <Card.Img className="img" src={ board.img } />
              </div>
              <div className="board-info">
                <h3>{board.name}</h3>
                <p>{board.dob} - {board.dod}</p>
                <div className="Link-div">
                <Link className="view-board" to={`/boards/${board._id}`}>
                  <Button variant="outline-success" className="viewButton"> View Board</Button>
                </Link>
                </div>
              </div>
              <div className="created-by">
                <p>Created by: </p>
                <p>{board.user?.displayName} </p>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
      <nav className="paginationContainer">
        <ul className="pagination">
          {pages.map((page) => (
            <li className={
              page === currentPage? "page-item active"  : "page-item"
            }
            >
              <p className="page-link"
              onClick={() =>pagination(page) }>{page}</p>
              </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}


